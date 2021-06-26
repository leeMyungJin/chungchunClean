<template>
    <div class="container-fluid">
        <p>
            This Menu is bound to an array of items' data using the <b>itemsSource</b> property,
            and customizes items content using a <b>wj-item-template</b> component.
        </p>
        <div class="form-group">
            <wj-menu
                :itemsSource="musicians"
                :header="'Artists'"
                :itemClicked="menuItemClicked">
                <wj-item-template v-slot="ctx">
                    <!--
                        ctx.item - item in itemsSource of ListBox control
                        ctx.itemIndex - index of item in itemsSource of ListBox control
                        ctx.control - ListBox controll
                    -->
                    <div v-if="ctx.item.photo">
                        <div style="min-width: 160px">
                            {{ ctx. itemIndex }}. <b>{{ ctx.item.name }}</b>
                            <div class="photo"><img :src="ctx.item.photo" height="50" /></div>
                        </div>
                    </div>
                    <div v-else>
                        <div style="min-width: 160px">
                            {{ ctx.itemIndex }}. <b>{{ ctx.item.name }}</b>
                        </div>
                    </div>
                </wj-item-template>
            </wj-menu>
        </div>

        <p>
            For this Menu we generate an array of <b>wj-menu-item</b> components with custom
            item content, using Vue <b>v-for</b> directive iterating through an array 
            of palette data.
        </p>
        <div class="form-group">
            <wj-menu
                :header="'Palette'"
                :value="selectedPalette"
                :itemClicked="selectedPaletteChanged">
                <wj-menu-item 
                        :value="palette.name" 
                        v-for="palette in palettes" 
                        :key="palette.name">
                    <div>
                        {{palette.name}}
                        <span style='float: right'>
                            <div
                                v-for="color in palette.colors"
                                v-bind:style="{
                                    backgroundColor: color,
                                    display:'inline',
                                    padding:'2px',
                                    height:'10px',
                                    width:'3px'
                                }">
                            </div>
                        </span>
                    </div>
                </wj-menu-item>
            </wj-menu>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getPalettes, getMusicians } from './data';

    let App = Vue.extend({
        name: 'app',
        data:function() {
            const musicianNames = getMusicians();
            const musicians = [];
            for (let i = 0; i < musicianNames.length; i++) {
                let item = {
                    id: i,
                    name: musicianNames[i],
                    photo: '|Paul|John|George|Ringo|'
                        .indexOf('|' + musicianNames[i] + '|') >= 0
                        ? 'resources/' + musicianNames[i] + '.png'
                        : null
                };
                musicians.push(item);
            }
            const palettes = getPalettes();
            return {
                selectedPalette: 'Standard',
                musicians: musicians,
                palettes: palettes,
            }
        },
        methods: {
            menuItemClicked: function(menu) {
                alert(`You selected option **${menu.selectedIndex}** from menu **${menu.header}**`);
            },
            selectedPaletteChanged: function(e){
                if (e.selectedValue) {
                    this.selectedPalette = e.selectedValue;
                }
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-dropdown {
        margin-right: 5px;
    }

    body {
        margin-bottom: 24pt;
    }

    .wj-form-control div {
        display: inline;
    }
</style>
