<script>
import { defineComponent } from '@vue/runtime-core';

import MainInfoSelectArrow from '../assets/icons/MainInfoSelectArrow.vue';
import Toggle from '../components/ToggleComponent.vue';
import MainInfoFooterIcon from '../assets/icons/MainInfoFooterIcon.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

export default defineComponent({
  components: {
    MainInfoSelectArrow,
    Toggle,
    MainInfoFooterIcon,
    ButtonComponent,
  },
  data() {
    return {
      mainInfoData: {
        company: '',
      },
      companyOptions: ['Company-1', 'Company-2', 'Company-3'],
    };
  },
  emits: ['handleData'],
  computed: {
    disabled() {
      return this.$store.getters.getFormSent;
    },
  },
  methods: {
    handleSubmit() {
      this.$store.commit('SET_MAIN_INFO_DATA', this.mainInfoData);
    },
    nextPage() {
      this.handleSubmit();
      this.$emit('handleData');
    },
  },
  created() {
    this.userData = this.$store.getters.getMainInfoData;
  },
});
</script>

<template>
  <div class="main-info">
    <div class="form-info">
      <form>
        <slot>
          <div class="form-group">
            <div class="form-group-column">
              <label class="text-label" for="first-name">First Name</label>
              <input
                class="input"
                v-model="mainInfoData.firstName"
                id="first-name"
                type="text"
                placeholder="First Name"
                :disabled="disabled"
              >
            </div>
            <div class="form-group-column">
              <label class="text-label" for="last-name">Last Name</label>
              <input
                class="input"
                v-model="mainInfoData.lastName"
                id="last-name"
                type="text"
                placeholder="Last Name"
                :disabled="disabled"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="form-group-column">
              <label class="text-label" for="email">Email Address</label>
              <input
                class="input"
                v-model="mainInfoData.email"
                id="email" type="text"
                placeholder="Email Address"
                :disabled="disabled"
              >
            </div>
            <div class="form-group-column">
              <label class="text-label" for="phone">Phone Number</label>
              <input
                class="input"
                v-model="mainInfoData.phone"
                id="phone"
                type="tel"
                placeholder="+38"
                maxlength="12"
                :disabled="disabled"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="form-group-column">
              <label class="text-label" for="position">Position</label>
              <input
                class="input"
                v-model="mainInfoData.position"
                id="position"
                type="text"
                placeholder="Position"
                :disabled="disabled"
              >
            </div>
            <div class="form-select">
              <label class="text-label" for="available-in-company">Available in company</label>
              <select
                id="available-in-company"
                v-model="mainInfoData.company"
                :disabled="disabled"
                >
                <option value="" disabled selected>Choose a company</option>
                <option
                  v-for="option in companyOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <main-info-select-arrow></main-info-select-arrow>
           </div>
          </div>
        </slot>
      </form>
    </div>
  </div>

  <div class="footer">
    <div class="toggle">
      <toggle :disabled="disabled"></toggle>
      <div class="icon">
        <main-info-footer-icon></main-info-footer-icon>
      </div>
    </div>
    <div>
      <button-component
        class="button"
        link to="/available-locations"
        @click="nextPage"
      >
        Next Step
      </button-component>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';

.form-info {
  padding: 20px 24px 30px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
}

.footer {
  padding: 30px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include onTablet {
    padding: 30px 30px;
  }
}

.toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-group {
  display: flex;
  gap: 20px;
  position: relative;

  @include onTablet {
    flex-direction: column;
    padding-left: 65px;
  }

  @include onMobile {
    padding-left: 25px;
  }
}

.form-group:not(:first-child) {
  margin-top: 20px;
}

.form-group-column {
  display: flex;
  flex-direction: column;
}

.text-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: $grey;
  margin-bottom: 4px;
}

.input {
  padding: 9px 8px;
  width: 345px;
  height: 40px;

  border: 1px solid rgba(29, 36, 82, 0.1);
  border-radius: 8px;

  color: $dark-blue;
  font-family: 'Inter', sans-serif;
  font-size: 16px;

  transition: all 0.2s;

  @include onTablet {
    width: 400px;
  }

  @include onMobile {
    font-size: 14px;
    width: 350px;
  }
}

input::placeholder {
  color: $grey;
}

.form-select {
  position: relative;
  width: 100%;
}

select {
  width: 100%;
  height: 40px;

  padding-right: 8px;
  padding-left: 8px;

  appearance: none;

  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;

  color: $grey;
  
  border: 1px solid rgba(29, 36, 82, 0.1);
  border-radius: 8px;
  outline: none;

  cursor: pointer;
  transition: all 0.2s;

  @include onMobile {
    font-size: 14px;
  }
}

select + svg {
  position: absolute;
  right: 0;
}

select:focus {
  color: $dark-blue;
}
</style>
