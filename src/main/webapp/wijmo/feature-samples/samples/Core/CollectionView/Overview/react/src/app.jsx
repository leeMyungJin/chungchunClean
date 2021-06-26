import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._filter = { id: '', country: '', color: '', minAmount: '' };
        this.doFilter = () => {
            if (this._timeOut) {
                clearTimeout(this._timeOut);
            }
            //
            this._timeOut = setTimeout(() => {
                this._timeOut = null;
                this._cv.refresh();
            }, 250);
        };
        this._cv = new wijmo.CollectionView(getData(500), {
            pageSize: 10,
            filter: this._filterFn.bind(this),
            newItemCreator: () => {
                var newItem = getData(1)[0];
                newItem.id = -1;
                return newItem;
            }
        });
        this._cv.collectionChanged.addHandler(() => {
            let gl = this._cv.items;
            if (this._cv.groups && this._cv.groups.length > 0) {
                gl = [];
                this._cv.groups.forEach(group => this._addGroup(gl, group));
            }
            this.setState({ groupedList: gl });
        });
        this._cv.currentChanged.addHandler(() => {
            this.isEditing();
            this.forceUpdate();
        });
        this.state = {
            isEditing: false,
            groupedList: this._cv.items
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <h4>Current Item</h4>
                    <dl className="dl-horizontal">
                        <dt>ID</dt>
                        <dd>
                            <input type="text" className="form-control" value={this._cv.currentItem ? this._cv.currentItem.id : ''} onChange={e => this.updateCurrentItem(e.target, 'id')} disabled={!this.state.isEditing}/>
                        </dd>
                        <dt>Country</dt>
                        <dd>
                            <input type="text" className="form-control" value={this._cv.currentItem ? this._cv.currentItem.country : ''} onChange={e => this.updateCurrentItem(e.target, 'country')} disabled={!this.state.isEditing}/>
                        </dd>
                        <dt>Color</dt>
                        <dd>
                            <input type="text" className="form-control" value={this._cv.currentItem ? this._cv.currentItem.color : ''} onChange={e => this.updateCurrentItem(e.target, 'color')} disabled={!this.state.isEditing}/>
                        </dd>
                        <dt>Amount</dt>
                        <dd>
                            <input type="number" className="form-control" value={this._cv.currentItem ? this._cv.currentItem.amount : ''} onChange={e => this.updateCurrentItem(e.target, 'amount')} disabled={!this.state.isEditing}/>
                        </dd>
                        <dt></dt>
                        <dd>
                            <div className="btn-group data-btn-group">
                                <button onClick={this.edit.bind(this)} style={{ display: !this.state.isEditing ? '' : 'none' }} className="btn btn-default btn-sm">Edit</button>
                                <button onClick={this.add.bind(this)} style={{ display: !this.state.isEditing ? '' : 'none' }} className="btn btn-default btn-sm">Add</button>
                                <button onClick={this.deleteItem.bind(this)} style={{ display: !this.state.isEditing ? '' : 'none' }} className="btn btn-default btn-sm">Delete</button>
                                <button onClick={this.commit.bind(this)} style={{ display: this.state.isEditing ? '' : 'none' }} className="btn btn-default btn-sm">Commit</button>
                                <button onClick={this.cancel.bind(this)} style={{ display: this.state.isEditing ? '' : 'none' }} className="btn btn-default btn-sm">Cancel</button>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className="col-md-6">
                    <h4>Navigation</h4>
                    <dl>
                        <dt>items</dt>
                        <dd>
                            <wjInput.CollectionViewNavigator cv={this._cv}></wjInput.CollectionViewNavigator>
                        </dd>
                        <dt>pages</dt>
                        <dd>
                            <wjInput.CollectionViewNavigator cv={this._cv} byPage></wjInput.CollectionViewNavigator>
                        </dd>
                    </dl>
                    <wjInput.Menu header='Page Size' value={this._cv.pageSize} itemClicked={this._pageSizeChanged.bind(this)}>
                        <wjInput.MenuItem value={0}>No Paging</wjInput.MenuItem>
                        <wjInput.MenuItem value={10}>10</wjInput.MenuItem>
                        <wjInput.MenuItem value={15}>15</wjInput.MenuItem>
                        <wjInput.MenuItem value={30}>30</wjInput.MenuItem>
                        <wjInput.MenuItem value={50}>50</wjInput.MenuItem>
                    </wjInput.Menu>
                </div>
            </div>

            <table className="table table-condensed table-bordered">
                <thead>
                    <tr className="active">
                        <th className="text-center">
                            <div className="btn-group">
                                <wjInput.Menu header='ID' value={this._filter.id} itemClicked={this._idChanged.bind(this)} style={{ display: "block" }}>
                                    <wjInput.MenuItem value=''>(All)</wjInput.MenuItem>
                                    <wjInput.MenuItem value='odd'>Odd</wjInput.MenuItem>
                                    <wjInput.MenuItem value='even'>Even</wjInput.MenuItem>
                                </wjInput.Menu>
                                <button className="btn btn-default" onClick={e => this.toggleSort('id')}>{this.getSort('id')}</button>
                            </div>
                        </th>
                        <th className="text-center">
                            <div className="btn-group">
                                <wjInput.Menu header='Country' value={this._filter.country} itemClicked={this._countryChanged.bind(this)} style={{ display: "block" }}>
                                    <wjInput.MenuItem value="">(All)</wjInput.MenuItem>
                                    <wjInput.MenuItem value="US">US</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Germany">Germany</wjInput.MenuItem>
                                    <wjInput.MenuItem value="UK">UK</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Japan">Japan</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Italy">Italy</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Greece">Greece</wjInput.MenuItem>
                                    <wjInput.MenuItem value="France">France</wjInput.MenuItem>
                                </wjInput.Menu>
                                <button className="btn btn-default" onClick={e => this.toggleSort('country')}>{this.getSort('country')}</button>
                                <button className="btn btn-default" onClick={e => this.toggleGroup('country')}>{this.getGroup('country')}</button>
                            </div>
                        </th>
                        <th className="text-center">
                            <div className="btn-group">
                                <wjInput.Menu header='Color' value={this._filter.color} itemClicked={this._colorChanged.bind(this)} style={{ display: "block" }}>
                                    <wjInput.MenuItem value="">(All)</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Black">Black</wjInput.MenuItem>
                                    <wjInput.MenuItem value="White">White</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Red">Red</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Green">Green</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Blue">Blue</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Yellow">Yellow</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Brown">Brown</wjInput.MenuItem>
                                    <wjInput.MenuItem value="Orange">Orange</wjInput.MenuItem>
                                </wjInput.Menu>
                                <button className="btn btn-default" onClick={e => this.toggleSort('color')}>{this.getSort('color')}</button>
                                <button className="btn btn-default" onClick={e => this.toggleGroup('color')}>{this.getGroup('color')}</button>
                            </div>
                        </th>
                        <th className="text-center">
                            <div className="btn-group">
                                <wjInput.Menu header='Amount' value={this._filter.minAmount} itemClicked={this._amountChanged.bind(this)} style={{ display: "block" }}>
                                    <wjInput.MenuItem value="">(All)</wjInput.MenuItem>
                                    <wjInput.MenuItem value={0}>> 0</wjInput.MenuItem>
                                    <wjInput.MenuItem value={500}>> 500</wjInput.MenuItem>
                                    <wjInput.MenuItem value={1000}>> 1000</wjInput.MenuItem>
                                </wjInput.Menu>
                                <button className="btn btn-default" onClick={e => this.toggleSort('amount')}>{this.getSort('amount')}</button>
                                <button className="btn btn-default" onClick={e => this.toggleGroup('amount')}>{this.getGroup('amount')}</button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.groupedList.map((item, index) => {
            return <tr key={index} className={item == this._cv.currentItem ? 'success' : ''} onClick={e => this.moveCurrentTo(item)}>
                                <td style={{ display: this.isGroup(item) ? '' : 'none' }} colSpan={4} className="active">
                                    <span style={{ display: 'inline-block', width: (item.level * 25) + 'px' }}></span>
                                    <b>{item.name}</b> ( items)
                                </td>

                                <td style={{ display: this.isGroup(item) ? 'none' : '' }} className="text-center">{item.id}</td>
                                <td style={{ display: this.isGroup(item) ? 'none' : '' }} className="text-center">{item.country}</td>
                                <td style={{ display: this.isGroup(item) ? 'none' : '' }} className="text-center">{item.color}</td>
                                <td style={{ display: this.isGroup(item) ? 'none' : '' }} className="text-center">{item.amount}</td>
                            </tr>;
        })}
                </tbody>
            </table>
        </div>;
    }
    _pageSizeChanged(sender) {
        if (sender.selectedItem) {
            this._cv.pageSize = sender.selectedValue;
        }
    }
    _idChanged(sender) {
        if (sender.selectedItem) {
            this._filter.id = sender.selectedValue;
            this.doFilter();
        }
    }
    _countryChanged(sender) {
        if (sender.selectedItem) {
            this._filter.country = sender.selectedValue;
            this.doFilter();
        }
    }
    _colorChanged(sender) {
        if (sender.selectedItem) {
            this._filter.color = sender.selectedValue;
            this.doFilter();
        }
    }
    _amountChanged(sender) {
        if (sender.selectedItem) {
            this._filter.minAmount = sender.selectedValue;
            this.doFilter();
        }
    }
    // IEditableCollectionView commands
    isEditing() {
        this.setState({ isEditing: this._cv.isEditingItem || this._cv.isAddingNew });
    }
    edit() {
        this._cv.editItem(this._cv.currentItem);
        this.isEditing();
    }
    add() {
        this._cv.addNew();
        this.isEditing();
    }
    deleteItem() {
        this._cv.remove(this._cv.currentItem);
        this.isEditing();
    }
    commit() {
        this._cv.commitEdit();
        this._cv.commitNew();
        this.isEditing();
    }
    cancel() {
        this._cv.cancelEdit();
        this._cv.cancelNew();
        this.isEditing();
    }
    moveCurrentTo(item) {
        if (!this.state.isEditing && !this.isGroup(item)) {
            this._cv.moveCurrentTo(item);
            this.forceUpdate();
        }
    }
    // sorting
    getSort(propName) {
        let sd = this._cv.sortDescriptions;
        if (sd.length > 0 && sd[0].property == propName) {
            return sd[0].ascending ? '▲' : '▼';
        }
        return '◇';
    }
    toggleSort(propName) {
        let sd = this._cv.sortDescriptions, ascending = true;
        //
        if (sd.length > 0 && sd[0].property == propName) {
            ascending = !sd[0].ascending;
        }
        //
        // remove any old sort descriptors and add the new one
        sd.splice(0, sd.length, new wijmo.SortDescription(propName, ascending));
    }
    // grouping
    getGroup(propName) {
        let index = this._findGroup(propName);
        return index < 0
            ? /*'▯' +*/ Array(this._cv.groupDescriptions.length + 2).join('▷')
            : /*'▮' +*/ Array(index + 2).join('▶');
    }
    toggleGroup(propName) {
        let gd = this._cv.groupDescriptions, index = this._findGroup(propName);
        //
        if (index >= 0) {
            gd.removeAt(index);
        }
        else {
            if (propName == 'amount') {
                // when grouping by amount, use ranges instead of specific values
                gd.push(new wijmo.PropertyGroupDescription(propName, (item) => {
                    if (item.amount > 1000)
                        return 'Large Amounts';
                    if (item.amount > 100)
                        return 'Medium Amounts';
                    if (item.amount > 0)
                        return 'Small Amounts';
                    //
                    return 'Negative Amounts';
                }));
            }
            else {
                // group by specific property values
                gd.push(new wijmo.PropertyGroupDescription(propName));
            }
        }
    }
    isGroup(item) {
        return item instanceof wijmo.CollectionViewGroup;
    }
    _addGroup(groupedList, g) {
        groupedList.push(g);
        //
        if (g.isBottomLevel) {
            g.items.forEach((item) => groupedList.push(item));
        }
        else {
            g.groups.forEach((group) => this._addGroup(groupedList, group));
        }
    }
    _findGroup(propName) {
        let gd = this._cv.groupDescriptions;
        for (let i = 0; i < gd.length; i++) {
            let pgd = gd[i];
            if (pgd.propertyName == propName) {
                return i;
            }
        }
        return -1;
    }
    // filtering
    _filterFn(item) {
        // check each filter parameter
        let f = this._filter;
        //
        if (f) {
            if ((f.id == 'odd' && item.id % 2 == 0) || (f.id == 'even' && item.id % 2 != 0)) {
                return false;
            }
            //
            if (f.country && item.country.indexOf(f.country) < 0) {
                return false;
            }
            //
            if (f.color && item.color.indexOf(f.color) < 0) {
                return false;
            }
            //
            if ((f.minAmount || f.minAmount === 0) && item.amount < f.minAmount) {
                return false;
            }
        }
        //
        // all passed, return true to include the item
        return true;
    }
    updateCurrentItem(target, binding) {
        this._cv.currentItem[binding] = target.value;
        this.forceUpdate();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
