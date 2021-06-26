import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { showPopup, hidePopup, hasClass, contains, closest, createElement, getElement, removeChild } from '@grapecity/wijmo';
import { ListBox } from '@grapecity/wijmo.react.input';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.isDragEnabled = false;
        this.dragSrc = null;
        this.dragDst = null;
        this.state = {
            data: getData()
        };
    }
    render() {
        return (<div className="container-fluid">
                <FlexGrid initialized={this.initializedGrid.bind(this)} itemsSource={this.state.data}/>
                <div className="column-picker-div" onDragStart={this.handleDragStart.bind(this)} onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)} onDragEnd={this.handleDragEnd.bind(this)}>
                    <ListBox className="column-picker" initialized={this.initializedPicker.bind(this)}/>
                </div>

                <div className="checkbox">
                    <label>
                        <input onClick={this.enableDrag.bind(this)} type="checkbox"/> Enable drag-and-drop
                    </label>
                </div>

                <p>
                    You can use the grid's
                    <b> columnLayout </b> property to allow users
                    to save and restore column layouts. Click the buttons below
                    to see how this works:
                </p>

                <button className="btn btn-default" onClick={this.saveLayout.bind(this)}>Save Layout</button>
                <button className="btn btn-default" onClick={this.loadLayout.bind(this)}>Restore Layout</button>
            </div>);
    }
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
                }
                else {
                    hidePopup(host, true, true);
                    this.flex.focus();
                }
                this.columnPicker.focus();
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
    }
    initializedPicker(picker) {
        this.columnPicker = picker;
    }
    componentDidMount() {
        if (this.flex) {
            this.columnPicker.itemsSource = this.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                hidePopup(this.columnPicker.hostElement);
            });
            this.columnPicker.formatItem.addHandler((s, e) => {
                this.enableDragItem(e.item, this.isDragEnabled);
            });
        }
    }
    saveLayout() {
        localStorage.setItem("myLayout", this.flex.columnLayout);
    }
    loadLayout() {
        let layout = localStorage.getItem("myLayout");
        if (layout) {
            this.flex.columnLayout = layout;
        }
    }
    handleDragStart(e) {
        this.dragSrc = closest(e.target, '.wj-listbox-item');
        if (this.dragSrc) {
            e.dataTransfer.setData('text', this.dragSrc.innerHTML);
            e.dataTransfer.effectAllowed = 'move';
        }
    }
    handleDragOver(e) {
        const dragOver = closest(e.target, '.wj-listbox-item');
        if (this.dragDst && this.dragDst !== dragOver) {
            this.removeDropMarker();
        }
        if (dragOver && dragOver !== this.dragSrc) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.dragDst = dragOver;
            const src = this.getElementIndex(this.dragSrc);
            const dst = this.getElementIndex(this.dragDst);
            this.removeDropMarker();
            this.addDropMarker(dst > src);
        }
        else {
            this.dragDst = null;
        }
    }
    handleDrop(e) {
        if (this.dragSrc && this.dragDst) {
            e.preventDefault();
            const src = this.getElementIndex(this.dragSrc);
            const dst = this.getElementIndex(this.dragDst);
            this.flex.columns.moveElement(src, dst);
        }
    }
    handleDragEnd(e) {
        this.dragSrc = null;
        this.dragDst = null;
        this.removeDropMarker();
    }
    enableDrag(e) {
        const element = e.target;
        this.isDragEnabled = element.checked;
        const host = this.columnPicker.hostElement;
        const items = host.getElementsByClassName('wj-listbox-item');
        for (let i = 0; i < items.length; i++) {
            this.enableDragItem(items[i], this.isDragEnabled);
        }
    }
    enableDragItem(item, enabled) {
        item.setAttribute('draggable', enabled.toString());
    }
    getElementIndex(element) {
        const parent = element.parentElement;
        const siblings = Array.prototype.slice.call(parent.children);
        return siblings.indexOf(element);
    }
    removeDropMarker() {
        removeChild(getElement('.drop-marker'));
    }
    addDropMarker(isAfterPos) {
        const itemsGap = 10;
        const width = 6;
        const margin = itemsGap / width;
        const height = this.dragDst.clientHeight;
        const topPos = this.dragDst.offsetTop;
        const leftPos = isAfterPos
            ? (this.dragDst.offsetLeft + this.dragDst.clientWidth + margin)
            : (this.dragDst.offsetLeft - itemsGap + margin);
        const css = `top:${topPos}px;left:${leftPos}px;height:${height}px;width:${width}px`;
        const html = `<div class="drop-marker" style="${css}">&nbsp</div>`;
        createElement(html, this.columnPicker.hostElement);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
