<template>
    <div>
        <h3>
            FlexRadar Control
        </h3>
        <p>
            This section shows FlexRadar Control.
        </p>

        <p />
        <div>
            <div >
                <wj-flex-radar
                        :items-source="items"
                        binding-x="country"
                        :chart-type="chartType"
                        :total-angle="totalAngle"
                        :start-angle="startAngle"
                        :stacking="stacking" >
                    <wj-flex-radar-series name="Sales" binding="sales" />
                    <wj-flex-radar-series name="Downloads" binding="downloads" />
                </wj-flex-radar>
            </div>
            <table class="table table-condensed">
                <tbody>
                <tr>
                    <td><label htmlFor="n">Chart Types</label></td>
                    <td>
                        <wj-combo-box
                                :items-source="chartTypes"
                                :text="chartType"
                                :text-changed="chartTypeChanged"/>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="n">Stacking</label></td>
                    <td>
                        <wj-combo-box
                                :items-source="stackingTypes"
                                :text="stacking"
                                :text-changed="stackingChanged" />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="n">Start Angle</label></td>
                    <td>
                        <wj-input-number
                                :value="startAngle"
                                :value-changed="startAngleValueChanged"
                                :min="0"
                                :max="360"
                                :step="60" />
                        <p />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="n">Total Angle</label></td>
                    <td>
                        <wj-input-number
                                :value="totalAngle"
                                :valueChanged="totalAngleValueChanged"
                                :min="90"
                                :max="360"
                                :step="90" />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>


<script>
import { DataService } from '../services/DataSvc';

export default {
    data: function () {
        
        return {
            items:DataService.getRadarData(),
            chartTypes: 'Line,LineSymbols,Area,Scatter,Column'.split(','),
            stackingTypes: 'None,Stacked,Stacked100pc'.split(','),
            chartType: 'Line',
            totalAngle: 360,
            startAngle: 0,
            stacking: 'None'      
        }
    },
    methods: {
        // Wijmo event handlers
        chartTypeChanged: function(s) {
            this.chartType = s.text;
        },
        stackingChanged: function (s) {
            this.stacking = s.text;
        },
        startAngleValueChanged: function (s) {
            this.startAngle = s.value;
        },
        totalAngleValueChanged: function (s) {
            if (s.value <= 360 && s.value >= 90) {
                this.totalAngle = s.value;
            }
        }
    },

};
</script>
