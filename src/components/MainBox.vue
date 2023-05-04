<script>
import { defineComponent } from '@vue/runtime-core';
import HeaderComponent from './HeaderComponent.vue';
import MainInfoHeaderCrossIcon from '../assets/icons/MainInfoHeaderCrossIcon.vue';

export default defineComponent({
  components: {
    HeaderComponent,
    MainInfoHeaderCrossIcon,
  }
});
</script>

<template>
  <div class="main-box">
    <slot></slot>
    <div class="icon-cross">
      <main-info-header-cross-icon></main-info-header-cross-icon>
    </div>
    <header-component></header-component>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';

.main-box {
  position: relative;
  width: 870px;
  margin: 40px auto;

  border-radius: 16px;

  background: $white;
  box-shadow: 0 8px 16px rgba(54, 62, 113, 0.24);

  @include onTablet {
    width: 570px;
  }

  @include onMobile {
    width: 450px;
  }
}

.icon-cross {
  position: absolute;
  top: 24px;
  right: 24px;
}
</style>