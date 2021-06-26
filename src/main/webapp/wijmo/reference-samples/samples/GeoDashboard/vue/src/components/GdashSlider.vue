<template>
<div style="height: 34px">
  <div style="width:230px; height:1px; background:gray; position:relative;	top:50%">
    <div style="text-align:center; border-radius:5px; width:10px; height:10px; background:#d2d1cf; position:relative; left:50%; top:-5px;"></div>
    <div class="marker" :style="{background: palette[1], left: position}" style="text-align:center; border-radius:30px; width:30px; height:30px; line-height:30px; background:black; color:white; position:relative; top:-25px; left:25%">
        {{ value }}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GdashSlider',
  props: {
    palette: Array,
    value: Number,
  },
  computed: {
    position: function() {
      // calculate slider position (as a percentage)
      let position = Math.log(this.value / 100);
      position = Math.min(Math.max(position, -1.5), +1.5);
      position = (position + 1.5) / 3;

      // convert to pixels
      position = position * 230 - 15;

      // apply position
      return position + 'px';
    }
  }
}
</script>