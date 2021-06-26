<template>
    <div>
        <h3>
            FinancialChart Control
        </h3>
        <div>
            This section shows FinancialChart Control. <b>Chart Types:</b> &nbsp;   &nbsp;
            <wj-combo-box
                    :items-source="chartTypes"
                    :text="chartType"
                    :text-changed="chartTypeChanged"/>
        </div>
        <p />
        <div class="seperator" />
        <wj-financial-chart
                :items-source="data"
                :symbol-size="4"
                header="FB Inc."
                binding-x="date"
                :chart-type="chartType"
                :options="options">
            <wj-financial-chart-series :binding="bindingY" />
        </wj-financial-chart>
        <p/>

    </div>
</template>

<script>
import * as wjcFinanceChart from '@grapecity/wijmo.chart.finance';

import { DataService } from '../services/DataSvc';
export default {
    data: function () {
        var bindingYs = DataService.getBindingYs();
        return {
            data:DataService.getFinanciaChartData(),
            chartTypes: DataService.getFinanciaChartType(),
            bindingYs: bindingYs,
            chartType: wjcFinanceChart.FinancialChartType.Area,
            bindingY: bindingYs[0],
            options: null
        }
    },
    methods: {
        // Wijmo event handlers
        chartTypeChanged: function(s) {
            var bindingY = this.bindingYs[s.selectedIndex],
                chartType = s.text;
            this.chartType = chartType;
            this.bindingY = bindingY;
            if (chartType === 'Renko') {
                this.options = {
                        renko: {
                            boxSize: 2,
                            rangeMode: 'Fixed',
                            fields: 'Close'
                        }
                    }
            } else if (chartType === 'Kagi') {
                this.options = {
                        kagi: {
                            reversalAmount: 1,
                            rangeMode: 'Fixed',
                            fields: 'Close'
                        }
                    }
            } else {
                this.options = null;
            }
        }
    },

};
</script>
