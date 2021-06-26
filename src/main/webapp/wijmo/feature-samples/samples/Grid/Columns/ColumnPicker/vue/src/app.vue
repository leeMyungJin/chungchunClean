<template>
  <div class="container-fluid">
    <wj-flex-grid :itemsSource="data" :initialized="initializedGrid"></wj-flex-grid>
    <div style="display:none">
			<wj-list-box class="column-picker" :initialized="initializedPicker"></wj-list-box>
    </div>

		<div class="checkbox">
			<label>
				<input v-on:click="enableDrag" type="checkbox"> Enable drag-and-drop
			</label>
    </div>

    <p>
		You can use the grid's
		<b>columnLayout</b> property to allow users
		to save and restore column layouts. Click the buttons below
		to see how this works:
    </p>
    <button v-on:click="saveLayout" class="btn btn-default">Save Layout</button>
    <button v-on:click="loadLayout" class="btn btn-default">Restore Layout</button>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.input";
import { showPopup, hidePopup, hasClass, contains, closest, createElement, getElement, removeChild } from "@grapecity/wijmo";
import { getData } from "./data";

new Vue({
	el: "#app",
	data: function() {
		return {
			data: getData(),
			isDragEnabled: false,
			dragSrc: null,
			dragDst: null
		};
	},
	methods: {
		saveLayout() {
			localStorage.setItem("myLayout", this.flex.columnLayout);
		},
		loadLayout() {
			let layout = localStorage.getItem("myLayout");
			if (layout) {
				this.flex.columnLayout = layout;
			}
		},
		initializedPicker(picker) {
			this.columnPicker = picker;
		},
		initializedGrid(ctl) {
			this.flex = ctl;
			this.flex.formatItem.addHandler((s, e) => {
				if (e.panel == s.topLeftCells) {
				e.cell.innerHTML =
					'<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
				}
			});

			// show the column picker when the user clicks the top-left cell
			let ref = this.flex.hostElement.querySelector(".wj-topleft");
			ref.addEventListener("mousedown", e => {
				if (hasClass(e.target, "column-picker-icon")) {
					let host = this.columnPicker.hostElement;
					if (!host.offsetHeight) {
						showPopup(host, ref, false, true, false);
						this.columnPicker.focus();
					} else {
						hidePopup(host, true, true);
						this.flex.focus();
					}
					e.preventDefault();
				}
			});
						
			// work around Safari/IOS bug (TFS 321525, 361500, 402670)
			// https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
			window.addEventListener('touchstart', (e) => {
				let host = this.columnPicker.hostElement;
				if (!contains(host, e.target) && !closest(e.target, '.wj-flexgrid')) {
					hidePopup(host, true, true);
				}
			});
		},
		handleDragStart(e) {
			this.dragSrc = closest(e.target, '.wj-listbox-item');
			if (this.dragSrc) {
				e.dataTransfer.setData('text', this.dragSrc.innerHTML);
				e.dataTransfer.effectAllowed = 'move';
			}
		},
		handleDragOver(e) {
			const dragOver = closest(e.target, '.wj-listbox-item');
			if (this.dragDst && this.dragDst !== dragOver) {
				this._removeDropMarker();
			}
			if (dragOver && dragOver !== this.dragSrc) {
				e.preventDefault();
				e.dataTransfer.dropEffect = 'move';
				
				this.dragDst = dragOver;
				
				const src = this._getElementIndex(this.dragSrc);
				const dst = this._getElementIndex(this.dragDst);
				this._removeDropMarker();
				this._addDropMarker(dst > src);
			} else {
				this.dragDst = null;
			}
		},
		handleDrop(e) {
			if (this.dragSrc && this.dragDst) {
				e.preventDefault();
				const src = this._getElementIndex(this.dragSrc);
				const dst = this._getElementIndex(this.dragDst);
				this.flex.columns.moveElement(src, dst);
			}
		},
		handleDragEnd(e) {
				this.dragSrc = null;
				this.dragDst = null;
				this._removeDropMarker();
		},
		enableDrag(e) {
			const element = e.target;
			this.isDragEnabled = element.checked;
			const host = this.columnPicker.hostElement;
			const items = host.getElementsByClassName('wj-listbox-item');
			for (let i = 0; i < items.length; i++) {
				this._enableDragItem(items[i], this.isDragEnabled);
			}
		},
		_enableDragItem(item, enabled) {
			item.setAttribute('draggable', enabled.toString());
		},
		_getElementIndex(element) {
			const parent = element.parentElement;
			const siblings = Array.prototype.slice.call(parent.children);
			return siblings.indexOf(element);
		},
		_removeDropMarker() {
				removeChild(getElement('.drop-marker'));
		},
		_addDropMarker(isAfterPos) {
				const itemsGap = 10;
				const width = 6;
				const margin = itemsGap/width;
				const height = this.dragDst.clientHeight;
				const topPos = this.dragDst.offsetTop;
				const leftPos = isAfterPos 
						? (this.dragDst.offsetLeft + this.dragDst.clientWidth + margin) 
						: (this.dragDst.offsetLeft - itemsGap + margin);
				const css = `top:${topPos}px;left:${leftPos}px;height:${height}px;width:${width}px`;
				const html = `<div class="drop-marker" style="${css}">&nbsp</div>`;
				createElement(html, this.columnPicker.hostElement);
		}
	},
	mounted: function() {
		if (this.flex) {
			this.columnPicker.itemsSource = this.flex.columns;
			this.columnPicker.checkedMemberPath = 'visible';
			this.columnPicker.displayMemberPath = 'header';
			this.columnPicker.lostFocus.addHandler(() => {
				hidePopup(this.columnPicker.hostElement);
			});
			this.columnPicker.formatItem.addHandler((s, e) => {
				this._enableDragItem(e.item, this.isDragEnabled);
			});
			const host = this.columnPicker.hostElement;
    	host.addEventListener('dragstart', this.handleDragStart);
			host.addEventListener('dragover', this.handleDragOver);
			host.addEventListener('drop', this.handleDrop);
			host.addEventListener('dragend', this.handleDragEnd);
		}
	}  
});
</script>

<style>
	.wj-flexgrid {
		max-height: 300px;
		margin: 10px 0;
	}
	.column-picker-icon {
		cursor: pointer;
		color: #FF8754;
		margin: 3px;
	}
	.wj-listbox.column-picker {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 0 10px;    
		columns: 4; /* IE fallback */
		padding: 12px;
		margin-left: 12px;
		margin-top: 26px;
		box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
	}
	body .wj-listbox .wj-listbox-item > label {
		display: block;
		margin: 0 0 3px 0;
	}
	.wj-listbox .wj-listbox-item.wj-state-selected
	{
		background: transparent;
		color: inherit;
	}
	.wj-listbox .wj-listbox-item:hover {
		background: rgba(0,0,0,.05);
	}
	.wj-listbox .drop-marker {
		position: absolute;
		background: #0085c7;
		opacity: 0.5;
		pointer-events: none;
		z-index: 1000;
	}
</style>

