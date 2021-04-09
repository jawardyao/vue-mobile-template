<template>
  <div :class="type">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
};
</script>

<style lang="less" scoped>
.default {
  color: #323233;
}
.info {
  color: #1989fa;
}
.danger {
  color: #ee0a24;
}
</style>
