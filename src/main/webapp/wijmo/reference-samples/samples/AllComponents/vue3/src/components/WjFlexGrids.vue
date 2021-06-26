<template>
    <div>
        <h3>
            FlexGrid Control
        </h3>
        <p>
            This section shows FlexGrid control with column definitions.</p>
        <div class="seperator" />
        <wj-group-panel
                :grid="flex"
                placeholder="Drag columns here to create Groups"
                :max-groups="4"/>
        <wj-flex-grid
                :initialized="gridInitialized"
                :items-source="itemsSource"
                :selection-changed="selectionChanged">

            <wj-flex-grid-filter />

            <wj-flex-grid-detail :isAnimated=true v-slot="ctx">
                <b>Details:</b>
                <ul>
                    <li>ID: <b>{{ctx.item.id}}</b></li>
                    <li>Country: <b>{{ctx.item.country}}</b></li>
                    <li>Date: <b>{{ctx.item.date}}</b></li>
                    <li>Downloads: <b>{{ctx.item.downloads}}</b></li>
                    <li>Sales: <b>{{ctx.item.sales}}</b></li>
                    <li>Active: <b>{{ctx.item.active}}</b></li>
                </ul>
            </wj-flex-grid-detail>

            <wj-flex-grid-column binding="id" header="ID" />
            <wj-flex-grid-column binding="country" header="Country">
                <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <span :class="'flag-icon flag-icon-' + cell.item.country.toLowerCase()"></span>
                    {{cell.item.country}}
                </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column binding="date" header="Date" />
            <wj-flex-grid-column binding="downloads" header="Downloads" />
            <wj-flex-grid-column binding="sales" header="Sales" />
            <wj-flex-grid-column binding="active" header="Active" />

        </wj-flex-grid>

    </div>
</template>

<script>
import * as wjcCore from '@grapecity/wijmo';

import { DataService } from '../services/DataSvc';
export default {
    data: function () {
        var data = DataService.getData(100);
        return {
            flex: null,
            itemsSource: data,
            selectedItem: data[0]
        }
    },
    methods: {
        gridInitialized: function (s) {
            this.flex = s;
        },
        selectionChanged: function(s) {
            this.selectedItem = s.selectedItems[0];
        },
        wjFormat: function (value, format) {
            return wjcCore.Globalize.format(value, format);
        }
    },

};
</script>
