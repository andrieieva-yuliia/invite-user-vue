<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
        required: false
    }
  },
});
</script>

<template>
  <router-link v-if="link" :to="to" class="button">
    <slot></slot>
  </router-link>
  <button v-else :to="to" class="button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';

.button {
  display: flex;
  align-items: center;
  position: relative;
  height: 40px;

  padding-left: 16px;
  padding-right: 16px;
  margin: 0;

  font-family: 'Inter', sans-serif;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;

  border: 0;
  border-radius: 20px;
  
  color: $white;
  background: $dark-blue;

  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: rgb(219, 217, 217);
  }

  @include onMobile {
    height: 35px;

    font-size: 14px;
  }
}
</style>
