<template>

     <div>
        <h3>
            Input Controls
            </h3>
        <p>
            This section shows input controls.</p>
        <table class="table table-condensed">
            <tbody>
                <tr>
                    <td><label htmlFor="n">InputNumber</label></td>
                    <td>
                        <!-- <wj-input-number
                            format="c2"
                            :min="0" :max="10" :step="0.5"
                            :value="theValue"
                            :value-changed="valueChanged" /> -->
                        <wj-input-number
                            format="c2"
                            :min="0" :max="10" :step="0.5"
                            v-model="theValue" />
                        <p>
                            <b>Value: {{wjFormat(theValue, 'c2')}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="d">InputDate/InputTime</label></td>
                    <td>
                        <wj-input-date
                            v-model:value="theDate"
                            :is-required="false"
                            format="MMM dd, yyyy"
                            placeholder="Date" />
                        <wj-input-time
                            :value="theDate"
                            :value-changed="dateChanged"
                            :is-required="false"
                            placeholder="Time" />
                        <p>
                            <b>Date/Time: {{wjFormat(theDate, 'yyyy/MM/dd  HH:mm')}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="dt">InputDateTime</label></td>
                    <td>
                        <wj-input-date-time
                            :value="theDate"
                            :value-changed="dateChanged"
                            :is-required="false"
                            placeholder="Date and Time" />
                        <p>
                            <b>DateTime: {{wjFormat(theDate, 'yyyy/MM/dd  HH:mm')}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="cl">Calendar</label></td>
                    <td>
                        <wj-calendar
                            id="cl"
                            :value="theDate"
                            :value-changed="dateChanged"
                            min="2015-01-01"
                            max="2020-12-31"/>
                        <p>
                            <b>Date: {{wjFormat(theDate, 'yyyy/MM/dd  HH:mm')}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="ipm">InputMask</label></td>
                    <td>
                        <wj-input-mask
                            mask="000-00-0000"
                            :value-changed="maskValueChanged"
                            title="Mask: 000-00-0000" />
                        <p>
                            <b>Value: {{maskValue}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="cmb2">ComboBox </label></td>
                    <td>
                        <wj-combo-box id="cmb2"
                            :items-source="countries"
                            :text-changed="countryChanged"
                            placeholder="Country" />
                        <p>
                           <b>Country: {{country}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="lb">ListBox </label></td>
                    <td>
                        <wj-list-box
                            v-bind:style="{ width: '250px', height: '150px' }"
                            :items-source="countries"
                            :selected-index-changed="selChanged" />
                        <p>
                            <b>selectedIndex: {{selectedIndex}}</b>
                        </p>
                        <p>
                            <b>selectedValue: {{selectedValue}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="lb2">ListBox 2</label></td>
                    <td>
                        <wj-list-box
                                v-bind:style="{ width: '250px', height: '150px' }"
                                :items-source="countries"
                                v-model:selectedIndex="selectedIndex2" />
                        <p>
                            <b>selectedIndex2: {{selectedIndex2}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="lbc">ListBox with itemTemplate</label></td>
                    <td>
                        <wj-list-box id="lbc"
                                     v-bind:style="{ width: '250px', height: '150px' }"
                                     :itemsSource="glyphs"
                                     :selectedValue="selectedGlyph"
                                     :selectedIndexChanged="onSelectedGlyphChanged">
                            <wj-item-template v-slot="ctx">
                                <!--
                                    ctx.item - item in itemsSource of ListBox control
                                    ctx.itemIndex - index of item in itemsSource of ListBox control
                                    ctx.control - ListBox controll
                                -->
                                <div class="wj-glyph">
                                    <span :class="'wj-glyph-' + ctx.item"></span>
                                </div>
                                {{ ctx.item }}
                            </wj-item-template>
                        </wj-list-box>
                        <p>
                            Selected Glyph: <span v-bind:class="'wj-glyph-'+ selectedGlyph"></span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="lb">MultiSelect </label></td>
                    <td>
                        <wj-multi-select
                            placeholder="Select Countries"
                            header-format="{count} countries selected"
                            :items-source="countries"
                            :checked-items-changed="ciChanged" />
                        <p>
                            <b>Checked Items: {{chkItems ? chkItems.toString() : ''}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="ac2">AutoComplete </label></td>
                    <td>
                        <wj-auto-complete id="ac2"
                            :items-source="countries"
                            :text="acCountry"
                            :text-changed="acCountryChanged"/>
                        <p>
                            <b>Country: {{acCountry}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="lb">MultiAutoComplete </label></td>
                    <td>
                        <wj-multi-auto-complete
                            placeholder="Countries"
                            :max-selected-items="4"
                            :items-source="countries"
                            :selected-items-changed="selItmsChanged"/>
                        <p>
                            <b>Selected Items: {{selItms ? selItms.join(', ') : ''}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="ac2">Menu </label></td>
                    <td>
                        <wj-menu
                            header="Edit"
                            :items-source="editMenuOptions"
                            :item-clicked="menuItemClicked" />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="ic">ColorPicker  </label></td>
                    <td>
                        <wj-color-picker
                            :value="color"
                            :show-color-string="true"
                            :value-changed="colorChanged" />
                        <p>
                            Color: {{color}}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="ic">InputColor </label></td>
                    <td>
                        <wj-input-color
                            :value="color"
                            :value-changed="colorChanged"/>
                        <p>
                            Color: {{color}}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="pop">Popup </label></td>
                    <td>
                 <p>
                    Click to see a popup dialog:
                    <button id="pop" type="button" class="btn" @click="modelessDialog.show()">
                        Click
                    </button>
                </p>
                <wj-popup :initialized="popupInitialized" show-trigger="Click" hide-trigger="None">
                    <h3 class="popover-title">
                        Title
                    </h3>
                    <div class="popover-content">
                        <form name="popoverForm">
                            <div class="form-group">
                                <br/>
                                <p>
                                <wj-input-number
                                        id="n"
                                        format="c2"
                                        :min="0" :max="10" :step="0.5"
                                        :value="theValue"
                                        :value-changed="valueChanged" />
                                    </p>
                                         <p>
                                    <wj-input-date
                                        :value="theDate"
                                        :value-changed="dateChanged"
                                        :is-required="false"
                                        format="MMM dd, yyyy"
                                        placeholder="Date" />
                                        </p>
                                           <p>
                                    <wj-auto-complete
                                        :items-source="countries"
                                        :text="acCountry"
                                        :text-changed="acCountryChanged"/>
                                    </p>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-danger wj-hide">Close</button>
                            </div>
                        </form>
                    </div>
                </wj-popup>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import * as wjcCore from '@grapecity/wijmo';
import { DataService } from '../services/DataSvc';

export default {
    data: function () {
        const countries = DataService.getAllCountries();
        const glyphs =  DataService.getGlyphs();
        return {            
            theValue: 7,
            theDate: new Date(),
            countries: countries,
            country: countries[0],
            acCountry: countries[0],
            maskValue: '',
            selectedIndex: 0,
            selectedValue: countries[0],
            selectedIndex2: 1,
            glyphs,
            selectedGlyph: glyphs[1],
            chkItems: null,
            selItms: [],
            color: '#ffffff',
            editMenuOptions: [
                '<i class="fa fa-cut"></i>&nbsp;&nbsp;<b>Cut</b><br><small><i>move the current selection to the clipboard</i></small>',
                '<i class="fa fa-copy"></i>&nbsp;&nbsp;<b>Copy</b><br><small><i>copy the current selection to the clipboard</i></small>',
                '<i class="fa fa-paste"></i>&nbsp;&nbsp;<b>Paste</b><br><small><i>insert clipboard content at the cursor position</i></small>'
            ],
            itemsSource: DataService.getData(100),
            modelessDialog:null,
        }
    },
    methods: {
        popupInitialized: function (s) {
            this.modelessDialog = s;
            const owner = document.getElementById('pop');
            if (owner) {
                this.modelessDialog.owner = owner;
            }
        },
        // Wijmo event handlers
        valueChanged: function(s) {
            // console.log(`VALUE = ${s.value}`);
            this.theValue = s.value;
        },
        dateChanged: function (s){
            this.theDate = s.value;
        },
        countryChanged: function (s) {
            this.country = s.text;
        },
        acCountryChanged: function (s) {
            this.acCountry = s.text;
        },
        maskValueChanged: function (s) {
            this.maskValue = s.value;
        },
        selChanged: function (s) {
            this.selectedIndex = s.selectedIndex;
            this.selectedValue = s.selectedValue;
        },
        onSelectedGlyphChanged: function (s) {
            this.selectedGlyph = s.selectedValue;
        },
        ciChanged: function (s) {
            this.chkItems = s.checkedItems;
        },
        selItmsChanged: function (s) {
            this.selItms = s.selectedItems
        },
        menuItemClicked: function (s) {
            alert('You\'ve selected option ' + s.selectedIndex + ' from the ' + s.header + ' menu!');
        },
        colorChanged: function (s) {
            this.color = s.value;
        },
        wjFormat: function (value, format) {
            return wjcCore.Globalize.format(value, format);
        }
    },
};
</script>
