<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    modelValue: {
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  computed: {
    isChecked() {
      if (this.isArray) {
        return this.modelValue.includes(this.value);
      } else {
        return this.modelValue;
      }
    },
    isArray() {
      return Array.isArray(this.modelValue)
    },
  },
  methods: {
    selectValue(value, checked) {
      if (this.isArray) {
        const newValue = [...this.modelValue];
        if (checked) {
          newValue.push(value);
        } else {
          const index = newValue.indexOf(value);
          newValue.splice(index, 1);
        }
        this.$emit("update:modelValue", newValue);
      } else {
        this.$emit("update:modelValue", checked, this.value);
      }
    },
  },
});
</script>

<template>
  <div class="checkbox">
    <label class="container">
      <input
        class="checkbox-input"
        :value="value"
        :id="value"
        :checked="isChecked"
        type="checkbox"
        :disabled="disabled"
        @change="selectValue($event.target.value, $event.target.checked)"
      />
      <div class="checked">
        <svg class="icon" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.82918 7.73564C3.73372 7.83166 3.60349 7.88523 3.46821 7.88523C3.33292 7.88523 3.20269 7.83166 3.10723 7.73564L0.224383 4.85232C-0.0747942 4.55315 -0.0747942 4.06801 0.224383 3.7694L0.585358 3.40833C0.884628 3.10915 1.3692 3.10915 1.66838 3.40833L3.46821 5.20825L8.3316 0.344759C8.63087 0.0455824 9.11591 0.0455824 9.41462 0.344759L9.7756 0.705828C10.0748 1.005 10.0748 1.49004 9.7756 1.78875L3.82918 7.73564Z" fill="white"/>
        </svg>
      </div>
    </label>
    <span v-if="label" class="checkbox-label">{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';

.checkbox {
  display: flex;
  align-items: center;
}

.container {
  display: block;
  position: relative;

  font-size: 20px;
  user-select: none;

  cursor: pointer;
  transition: all 0.2s;
}
.checkbox-label {
  margin-left: 8px;

  font-weight: 500;
  color: $dark-blue;
  font-size: 16px;

  @include onMobile {
    font-size: 14px;
  }
}
.container .checkbox-input {
  position: absolute;
  opacity: 0;

  height: 0;
  width: 0;

  cursor: pointer;
  transition: all 0.2s;
}

.container .checkbox-input:checked + .checked {
  background-color: $blue;
  border: none;
}

.container .checkbox-input:checked + .checked:after {
  display: block;
}

.checked {
  position: relative;
  top: 0;
  left: 0;

  height: 18px;
  width: 18px;

  border: 1px solid rgba(29, 36, 82, 0.1);
  border-radius: 4px;

  cursor: pointer;
  transition: all 0.2s;
  .icon {
    transform: translate(-50%, -50%);

    position: absolute;
    left: 50%;
    top: 50%;
  }
}
</style>