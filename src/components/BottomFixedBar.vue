<template>
  <div :style="{ height: `${containerHeight}px` }">
    <div class="bottom-fixed">
      <div id="fixed-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      containerHeight: 52,
    };
  },
  methods: {
    getFixedHeight() {
      const fixedContentDom = document.getElementById('fixed-content');
      const client = fixedContentDom.getBoundingClientRect();
      const height = client.bottom - client.top;
      this.containerHeight = height;
    },
  },
  mounted() {
    this.getFixedHeight();
  },
};
</script>

<style>
.bottom-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>
