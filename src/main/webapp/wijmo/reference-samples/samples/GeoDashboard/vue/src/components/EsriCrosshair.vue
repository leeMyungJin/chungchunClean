<template>
  <div>
    <div :style="{ backgroundColor: palette[0], left: '50%', top: '50%', width: '8px', height: '8px', marginLeft: '-4px', marginTop: '-4px', borderRadius: '20px', zIndex: 2, }" class="crosshair crosshair-circle-xs" />
    <div :style="{ backgroundColor: color, left: '50%', top: '50%', width: '40px', height: '40px', marginLeft: '-20px', marginTop: '-20px', borderRadius: '20px', boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)', zIndex: 1 }" class="crosshair crosshair-circle-sm" />
    <div :style="{ border: `20px solid ${palette[0]}`, left: '50%', top: '50%', width: '40px', height: '40px', marginLeft: '-40px', marginTop: '-40px', borderRadius: '100px', boxSizing: 'content-box', opacity: '0.25', zIndex: 0 }" class="crosshair crosshair-circle-lg" />
  </div>
</template>

<script>
export default {
  name: 'EsriCrosshair',
  props: {
    color: String,
    palette: Array
  }
}
</script>