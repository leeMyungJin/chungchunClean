<template>
  <div class="legend-list" v-if="source" v-show="source">
    <div class="legend-item" v-for="(legend, index) in source.legends" :key="index">
      <div :style="{ margin: '0 .75rem 0 0', width: '1rem', height: '1rem', display: 'inline-block', 'background-color': legend.color }"></div>
      {{ legend.label }}
    </div>
 </div>
</template>

<script>
export default {
  name: 'EsriLegend',
  props: {
    source: Object
  }
}
</script>