<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <h4>Current Item</h4>
                <dl class="dl-horizontal">
                    <dt>ID</dt>
                    <dd>
                        <input type="text" class="form-control"
                            v-model="cv.currentItem && cv.currentItem.id"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt>Country</dt>
                    <dd>
                        <input type="text" class="form-control"
                            v-model="cv.currentItem && cv.currentItem.country"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt>Color</dt>
                    <dd>
                        <input type="text" class="form-control"
                            v-model="cv.currentItem && cv.currentItem.color"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt>Amount</dt>
                    <dd>
                        <input type="number" class="form-control"
                            v-model="cv.currentItem && cv.currentItem.amount"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt></dt>
                    <dd>
                        <div class="btn-group data-btn-group">
                            <button @click="edit()" v-bind:style="{display: !isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Edit</button>
                            <button @click="add()" v-bind:style="{display: !isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Add</button>
                            <button @click="deleteItem()" v-bind:style="{display: !isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Delete</button>
                            <button @click="commit()" v-bind:style="{display: isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Commit</button>
                            <button @click="cancel()" v-bind:style="{display: isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Cancel</button>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="col-md-6">
                <h4>Navigation</h4>
                <dl>
                    <dt>items</dt>
                    <dd>
                        <wj-collection-view-navigator :cv="cv"></wj-collection-view-navigator>
                    </dd>
                    <dt>pages</dt>
                    <dd>
                        <wj-collection-view-navigator :cv="cv" :byPage="true"></wj-collection-view-navigator>
                    </dd>
                </dl>
                <wj-menu
                    :value="cv.pageSize"
                    :header="'Page Size'"
                    :itemClicked="selectionPageChanged">
                    <wj-menu-item :value="0">No Paging</wj-menu-item>
                    <wj-menu-item :value="10">10</wj-menu-item>
                    <wj-menu-item :value="15">15</wj-menu-item>
                    <wj-menu-item :value="30">30</wj-menu-item>
                    <wj-menu-item :value="50">50</wj-menu-item>
                </wj-menu>
            </div>
        </div>

        <table class="table table-condensed table-bordered">
            <thead>
                <tr class="active">
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu
                                :header="'ID'"
                                :itemClicked="selectionIDChanged"
                                :value="filter.id"
                                style="display:block">
                                <wj-menu-item :value="''">(All)</wj-menu-item>
                                <wj-menu-item :value="'odd'">Odd</wj-menu-item>
                                <wj-menu-item :value="'even'">Even</wj-menu-item>
                            </wj-menu>
                            <button class="btn btn-default" @click="toggleSort('id')">{{getSort('id')}}</button>
                        </div>
                    </th>
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu
                                :header="'Country'"
                                :itemClicked="selectionCountryChanged"
                                :value="filter.country"
                                style="display:block">
                                <wj-menu-item :value="''">(All)</wj-menu-item>
                                <wj-menu-item :value="'US'">US</wj-menu-item>
                                <wj-menu-item :value="'Germany'">Germany</wj-menu-item>
                                <wj-menu-item :value="'UK'">UK</wj-menu-item>
                                <wj-menu-item :value="'Japan'">Japan</wj-menu-item>
                                <wj-menu-item :value="'Italy'">Italy</wj-menu-item>
                                <wj-menu-item :value="'Greece'">Greece</wj-menu-item>
                                <wj-menu-item :value="'France'">France</wj-menu-item>
                            </wj-menu>
                            <button class="btn btn-default" @click="toggleSort('country')">{{getSort('country')}}</button>
                            <button class="btn btn-default"
                                @click="toggleGroup('country')">{{getGroup('country')}}</button>
                        </div>
                    </th>
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu
                                :header="'Color'"
                                :itemClicked="selectionColorChanged"
                                :value="filter.color"
                                style="display:block">
                                <wj-menu-item :value="''">(All)</wj-menu-item>
                                <wj-menu-item :value="'Black'">Black</wj-menu-item>
                                <wj-menu-item :value="'White'">White</wj-menu-item>
                                <wj-menu-item :value="'Red'">Red</wj-menu-item>
                                <wj-menu-item :value="'Green'">Green</wj-menu-item>
                                <wj-menu-item :value="'Blue'">Blue</wj-menu-item>
                                <wj-menu-item :value="'Yellow'">Yellow</wj-menu-item>
                                <wj-menu-item :value="'Brown'">Brown</wj-menu-item>
                                <wj-menu-item :value="'Orange'">Orange</wj-menu-item>
                            </wj-menu>
                            <button class="btn btn-default" @click="toggleSort('color')">
                                {{getSort('color')}}
                            </button>
                            <button class="btn btn-default" @click="toggleGroup('color')">
                                {{getGroup('color')}}
                            </button>
                        </div>
                    </th>
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu
                                :header="'Amount'"
                                :itemClicked="selectionAmountChanged"
                                :value="filter.minAmount"
                                style="display:block">
                                <wj-menu-item :value="''">(All)</wj-menu-item>
                                <wj-menu-item :value="0">&gt; 0</wj-menu-item>
                                <wj-menu-item :value="500">&gt; 500</wj-menu-item>
                                <wj-menu-item :value="1000">&gt; 1,000</wj-menu-item>
                            </wj-menu>
                            <button class="btn btn-default" @click="toggleSort('amount')">
                                {{getSort('amount')}}
                            </button>
                            <button class="btn btn-default" @click="toggleGroup('amount')">
                                {{getGroup('amount')}}
                            </button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in groupedList"
                    v-bind:key="item"
                    v-bind:class="{success: item == cv.currentItem}"
                    @click="moveCurrentTo(item)">
                    <!-- group row -->
                    <td v-bind:style="{display:isGroup(item)?'':'none'}" colspan="4" class="active">
                        <span v-bind:style="{display:'inline-block', width: (item.level * 25) + 'px'}"></span>
                        <b>{{item.name}}</b> ( items)
                    </td>

                    <!-- data row -->
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">
                        {{item.id}}
                    </td>
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">
                        {{item.country}}
                    </td>
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">
                        {{item.color}}
                    </td>
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">
                        {{item.amount | number:'1.2-2'}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import { getData } from './data';
    import * as wijmo from '@grapecity/wijmo';

    new Vue({
        el: '#app',
        data: function () {
            return { 
                cv: new wijmo.CollectionView(getData(500), {
                    pageSize: 10,
                    filter: this._filterFun.bind(this),
                    newItemCreator: () => {
                        var newItem = getData(1)[0];
                        newItem.id = -1;
                        return newItem;
                    }
                }),
                groupedList: [],
                filter: {}
            }
        }, 
        mounted: function(){
            this.filter = { id: '', country: '', color: '', minAmount: '' };
            
            this.groupedList = this.cv.items;
            //
            this.cv.collectionChanged.addHandler(() => {
                this.groupedList = this.cv.items;
                if (this.cv.groups && this.cv.groups.length > 0) {
                    this.groupedList = [];
                    this.cv.groups.forEach(group => this._addGroup(group));
                }
            });
        },
        methods:{
            doFilter() {
                if (this._timeOut) {
                    clearTimeout(this._timeOut);
                }
                //
                this._timeOut = setTimeout(() => {
                    this._timeOut = null;
                    this.cv.refresh();
                }, 250);
            },
            getFilteredItem(source, value){
                let item = source.filter((item)=>{ return item.value == value })[0];
                if(item !== undefined){
                    return item.header;
                }
            },
            selectionPageChanged(menu){
                this.cv.pageSize = menu.selectedValue;
            },
            selectionIDChanged(menu){
                this.filter.id = menu.selectedValue;
                this.doFilter();
            },
            selectionCountryChanged(menu){
                this.filter.country = menu.selectedValue;
                this.doFilter();
            },
            selectionColorChanged(menu){
                this.filter.color = menu.selectedValue;
                this.doFilter();
            },
            selectionAmountChanged(menu){
                this.filter.minAmount = menu.selectedValue;
                this.doFilter();
            },
            //
            // IEditableCollectionView commands
            isEditing() {
                return this.cv.isEditingItem || this.cv.isAddingNew;
            },
            //
            edit() {
                this.cv.editItem(this.cv.currentItem);
            },
            //
            add() {
                this.cv.addNew();
            },
            //
            deleteItem() {
                this.cv.remove(this.cv.currentItem);
            },
            //
            commit() {
                this.cv.commitEdit();
                this.cv.commitNew();
            },
            //
            cancel() {
                this.cv.cancelEdit();
                this.cv.cancelNew();
            },
            //
            moveCurrentTo(item) {
                if (!this.isEditing() && !this.isGroup(item)) {
                    this.cv.moveCurrentTo(item);
                }
            },
            //
            // sorting
            getSort(propName) {
                let sd = this.cv.sortDescriptions;
                if (sd.length > 0 && sd[0].property == propName) {
                    return sd[0].ascending ? '▲' : '▼';
                }
                return '◇';
            },
            //
            toggleSort(propName) {
                let sd = this.cv.sortDescriptions,
                    ascending = true;
                //
                if (sd.length > 0 && sd[0].property == propName) {
                    ascending = !sd[0].ascending;
                }
                //
                // remove any old sort descriptors and add the new one
                sd.splice(0, sd.length, new wijmo.SortDescription(propName, ascending));
            },
            //
            // grouping
            getGroup(propName) {
                let index = this._findGroup(propName);
                return index < 0
                    ? /*'▯' +*/ Array(this.cv.groupDescriptions.length + 2).join('▷')
                    : /*'▮' +*/ Array(index + 2).join('▶');
            },
            //
            toggleGroup(propName) {
                let gd = this.cv.groupDescriptions,
                    index = this._findGroup(propName);
                //
                if (index >= 0) {
                    gd.removeAt(index);
                } else {
                    if (propName == 'amount') {
                        // when grouping by amount, use ranges instead of specific values
                        gd.push(new wijmo.PropertyGroupDescription(propName, (item) => {
                            if (item.amount > 1000) return 'Large Amounts';
                            if (item.amount > 100) return 'Medium Amounts';
                            if (item.amount > 0) return 'Small Amounts';
                            //
                            return 'Negative Amounts';
                        }));
                    } else {
                        // group by specific property values
                        gd.push(new wijmo.PropertyGroupDescription(propName));
                    }
                }
            },
            //
            isGroup(item) {
                return item instanceof wijmo.CollectionViewGroup;
            },
            _addGroup(g) {
                this.groupedList.push(g);
                //
                if (g.isBottomLevel) {
                    g.items.forEach(item => this.groupedList.push(item));
                } else {
                    g.groups.forEach(group => this._addGroup(group));
                }
            },
            //
            _findGroup(propName) {
                let gd = this.cv.groupDescriptions;
                //
                for (let i = 0; i < gd.length; i++) {
                    if (gd[i].propertyName == propName) {
                        return i;
                    }
                }
                //
                return -1;
            },
            //
            // filtering
            _filterFun(item) {
                // check each filter parameter
                let f = this.filter;
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
            
        }
    })
</script>

<style>
    .table {
        margin-bottom: 0px !important;
    }
</style>
