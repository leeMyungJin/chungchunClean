import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { showPopup, hidePopup, hasClass, contains, closest, createElement, getElement, removeChild } from '@grapecity/wijmo';
import { ListBox } from '@grapecity/wijmo.input';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    
    // references FlexGrid named 'flex' in the view
    @ViewChild('flex', { static: true }) flex: FlexGrid;
    @ViewChild('columnPicker', { static: true }) columnPicker: ListBox;

    private _isDragEnabled: boolean = false;
    private _dragSrc: HTMLElement = null;
    private _dragDst: HTMLElement = null;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    ngOnInit() {
        if (this.flex) {
            this.flex.formatItem.addHandler((s: FlexGrid, e: FormatItemEventArgs) => {
                if (e.panel == s.topLeftCells) {
                    e.cell.innerHTML = '<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
                }
            });
    
            // show the column picker when the user clicks the top-left cell
            let ref = this.flex.hostElement.querySelector('.wj-topleft');
            ref.addEventListener('mousedown', (e) => {
                if (hasClass(<Element>e.target, 'column-picker-icon')) {
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
        }
    }

    ngAfterViewInit() {
        if (this.flex) {
            this.columnPicker.itemsSource = this.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                hidePopup(this.columnPicker.hostElement);
            });
            this.columnPicker.formatItem.addHandler((s, e) => {
                this._enableDragItem(e.item, this._isDragEnabled);
            });
        }
    }

    saveLayout() {
        localStorage.setItem('myLayout', this.flex.columnLayout);
    }

    loadLayout() {
        let layout = localStorage.getItem('myLayout');
        if (layout) {
    	    this.flex.columnLayout = layout;
		}
    }

    handleDragStart(e: DragEvent) {
        this._dragSrc = <HTMLElement> closest(e.target, '.wj-listbox-item');
        if (this._dragSrc) {
            e.dataTransfer.setData('text', this._dragSrc.innerHTML);
            e.dataTransfer.effectAllowed = 'move';
        }
    }

    handleDragOver(e: DragEvent) {
        const dragOver = <HTMLElement> closest(e.target, '.wj-listbox-item');
        if (this._dragDst && this._dragDst !== dragOver) {
            this._removeDropMarker();
        }
        if (dragOver && dragOver !== this._dragSrc) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            this._dragDst = dragOver;
            
            const src = this._getElementIndex(this._dragSrc);
            const dst = this._getElementIndex(this._dragDst);
            this._removeDropMarker();
            this._addDropMarker(dst > src);
        } else {
            this._dragDst = null;
        }
    }

    handleDrop(e: DragEvent) {
        if (this._dragSrc && this._dragDst) {
            e.preventDefault();
            const src = this._getElementIndex(this._dragSrc);
            const dst = this._getElementIndex(this._dragDst);
            this.flex.columns.moveElement(src, dst);
        }
    }

    handleDragEnd(e: DragEvent) {
        this._dragSrc = null;
        this._dragDst = null;
        this._removeDropMarker();
    }

    enableDrag(e: Event) {
        const element = <HTMLInputElement> e.target;
        this._isDragEnabled = element.checked;
        const host = this.columnPicker.hostElement;
        const items = host.getElementsByClassName('wj-listbox-item');
        for (let i = 0; i < items.length; i++) {
            this._enableDragItem(items[i], this._isDragEnabled);
        }
    }

    private _enableDragItem(item: Element, enabled: boolean) {
        item.setAttribute('draggable', enabled.toString());
    }

    private _getElementIndex(element: Element): number {
        const parent = element.parentElement;
        const siblings = Array.prototype.slice.call(parent.children);
        return siblings.indexOf(element);
    }

    private _removeDropMarker() {
        removeChild(getElement('.drop-marker'));
    }
    
    private _addDropMarker(isAfterPos: boolean) {
        const itemsGap = 10;
        const width = 6;
        const margin = itemsGap/width;
        const height = this._dragDst.clientHeight;
        const topPos = this._dragDst.offsetTop;
        const leftPos = isAfterPos 
            ? (this._dragDst.offsetLeft + this._dragDst.clientWidth + margin) 
            : (this._dragDst.offsetLeft - itemsGap + margin);
        const css = `top:${topPos}px;left:${leftPos}px;height:${height}px;width:${width}px`;
        const html = `<div class="drop-marker" style="${css}">&nbsp</div>`;
        createElement(html, this.columnPicker.hostElement);
    }

    private _getData() {

        // generate some random data
        let data = [],
            countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
            products = ['Widget', 'Sprocket', 'Gadget', 'Doohickey'],
            colors = ['Black', 'White', 'Red', 'Green', 'Blue'],
            dt = new Date();
        for (let i = 0; i < 100; i++) {
            let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                countryId = Math.floor(Math.random() * countries.length),
                productId = Math.floor(Math.random() * products.length),
                colorId = Math.floor(Math.random() * colors.length);
            let item = {
                id: i,
                start: date,
                end: date,
                country: countries[countryId],
                product: products[productId],
                color: colors[colorId],
                countryId: countryId,
                productId: productId,
                colorId: colorId,
                amount1: Math.random() * 10000 - 5000,
                amount2: Math.random() * 10000 - 5000,
                amount3: Math.random() * 10000 - 5000,
                amount4: Math.random() * 10000 - 5000,
                amount5: Math.random() * 10000 - 5000,
                discount: Math.random() / 4,
                active: i % 4 == 0
            };
            data.push(item);
        }

        return data;
    }
}
//
@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

