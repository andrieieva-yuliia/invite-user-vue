<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({});
</script>

<template>
  <main-box></main-box>
</template>

<style lang="scss">
@import './style/normalize.scss';

html {
  height: 100%;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;

  color: rgba(29, 36, 82, 0.5);
  background-color: #fafafa;
}
</style>