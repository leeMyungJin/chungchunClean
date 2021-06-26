<template>
  <div class="tile" @click="$emit('tileClick')">
    <div class="tile-header">
      <svg width="24" height="24" viewBox="0 0 24 24" v-html="icon" />
      <span>{{header}}</span>
    </div>
    <div class="tile-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GdashTile',
  props: {
    header: String,
    icon: String,
  }
}
</script>