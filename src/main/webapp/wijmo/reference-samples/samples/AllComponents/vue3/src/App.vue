<template>
  <div>
    <h1>Using Wijmo all components for Vue3 external modules</h1>
    <p>
      This sample uses external module versions of the Wijmo for Vue3 interop.
    </p>
    <div class="content">
      <wj-inputs />
      <wj-flex-grids />
      <wj-olaps />
      <wj-multi-rows/>
      <wj-flex-charts />
      <wj-financial-charts />
      <wj-hierarchical-charts />
      <wj-radar-charts/>
      <wj-gauges/>
      <wj-navs/>
      <wj-viewers/>
      <wj-flex-sheets/>
    </div>
  </div>
</template>

<script>
  import { version } from 'vue';
  import WjInputs from './components/WjInputs';
  import WjFlexGrids from './components/WjFlexGrids';
  import WjOlaps from './components/WjOlaps';
  import WjFlexCharts from './components/WjFlexCharts';
  import WjMultiRows from './components/WjMultiRows';
  import WjFinancialCharts from './components/WjFinancialCharts';
  import WjHierarchicalCharts from './components/WjHierarchicalCharts';
  import WjRadarCharts from './components/WjRadarCharts';
  import WjGauges from './components/WjGauges';
  import WjNavs from './components/WjNavs';
  import WjViewers from './components/WjViewers';
  import WjFlexSheets from './components/WjFlexSheets';

  export default {
    data() {
        return {
            version,
        };
    },
    components: {
        WjInputs,
        WjFlexGrids,
        WjOlaps,
        WjFlexCharts,
        WjMultiRows,
        WjFinancialCharts,
        WjHierarchicalCharts,
        WjRadarCharts,
        WjGauges,
        WjNavs,
        WjViewers,
        WjFlexSheets,
    },
  }
</script>
