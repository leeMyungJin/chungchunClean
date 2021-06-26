<template>
    <div>
        <h3>
            Olap Control
        </h3>
        <p>
            This section shows Olap Controls:PivotPanel, PivotGrid and PivotChart.
        </p>
        <table class="table table-condensed">
            <tbody>
            <tr>
                <td><label htmlFor="n">PivotPanel</label></td>
                <td>
                  <wj-pivot-panel :engine="engine"></wj-pivot-panel>
                </td>
            </tr>
            <tr>
                <td><label htmlFor="n">PivotGrid</label></td>
                <td>
                  <wj-pivot-grid :items-source="engine" show-selected-headers="All"></wj-pivot-grid>
                </td>
            </tr>
            <tr>
                <td><label htmlFor="n">PivotChart</label></td>
                <td>
                    <div class="detail"><b>Chart Type:&nbsp;&nbsp;</b>
                        <wj-combo-box
                                :items-source="chartTypes"
                                :text="chartType"
                                :text-changed="chartTypeChanged">
                        </wj-combo-box>
                    </div>
                    <p/>
                    <wj-pivot-chart :chart-type="chartType" :items-source="engine"></wj-pivot-chart>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>


<script>
import * as wjcOlap from '@grapecity/wijmo.olap';
import { DataService } from '../services/DataSvc';

export default {
    data: function () {
        return {
            chartTypes: 'Column,Bar,Scatter,Line,Area,Pie'.split(','),
            chartType: 'Column',
        }
    },
    created: function () {
        this.engine = new wjcOlap.PivotEngine({
            itemsSource: DataService.getSimpleDataSet(),
            rowFields: ['Product', 'Country'],
            valueFields: ['Sales', 'Downloads'],
            showRowTotals: wjcOlap.ShowTotals.Subtotals,
            showColumnTotals: wjcOlap.ShowTotals.Subtotals,
        });
    },
    methods: {
        chartTypeChanged:function(s) {
            this.chartType = s.text;
        }
    },

};
</script>
