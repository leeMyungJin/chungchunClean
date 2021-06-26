<template>
    <div>
        <h3>
            MultiRow Control
        </h3>
        <div>
            This section shows MultiRow Control. <b>Layout: </b>  &nbsp;   &nbsp;
            <wj-combo-box
                    :items-source="layoutDefs"
                    display-member-path="name"
                    :selectedItem="selectedItem"
                    :text-changed="layoutDefChanged"/>
        </div>
        <p />
        <div class="seperator" />
        <wj-multi-row
                :layout-definition="layoutDefinition"
                :items-source="orders"/>
        <p />
        {{desc}}

    </div>
</template>


<script>
import { DataService } from '../services/DataSvc';

export default {
    data: function () {
        var layoutDefs = DataService.getLayoutDefs();
        var initialDef = layoutDefs.items[2];
        return {
            orders: DataService.getMultiRowData(),
            layoutDefs: layoutDefs,
            layoutDefinition: initialDef.def,
            desc: initialDef.description,
            selectedItem: initialDef,
        }
    },
    methods: {
        layoutDefChanged:function() {
            var currentItem = this.layoutDefs.currentItem;
            //this.multiRow.layoutDefinition = currentItem.def;
            this.selectedItem = currentItem;
            this.layoutDefinition = currentItem.def;
            this.desc = currentItem.description;
        }
    },

};
</script>
