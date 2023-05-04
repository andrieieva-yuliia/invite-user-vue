<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
  },
  computed: {
    isActive() {
      let addedClass = '';

      if (this.disabled) {
        addedClass += 'disabled ';
      }

      if (this.active) {
        addedClass += 'is-active';
      }

      return addedClass;
    }
  },
  data() {
    return {
      active: false,
    }
  },
  methods: {
    handleToggle() {
      if (!this.disabled) {
        this.active = !this.active;
      }
    }
  }
});
</script>

<template>
  <div class="toggle"
    :class="isActive"
    :disabled="false"
    @click="handleToggle"
  >
    <div
      class="toggle-container"
      :class="isActive"
      :disabled="false"
    >
    </div>
    <div class="toggle-switch"></div>
  </div>
  <div
    class="text"
    :class="isActive"
    :disabled="false"
  >
    Active in all companies
  </div>
</template>

<style scoped lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';

.toggle {
  position: relative;

  width: 44px;
  height: 24px;
  padding: 2px;
  cursor: pointer;

  &.is-active {
    .toggle-switch {
      left: calc(100% - 20px);
    }
  }

  &-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;

    background: $grey;
    border-radius: 12px;

    &.is-active {
      background: $blue;
    }
  }

  &-switch {
    position: relative;
    width: 20px;
    height: 20px;

    border-radius: 50%;
    background: $white;
    transition: all 0.2s;
  }
}
.text {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;

  @include onMobile {
    font-size: 14px;
  }
}

.is-active {
  color: $blue;
  transition: all 0.2s;
}
</style>