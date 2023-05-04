<script>
import { defineComponent } from '@vue/runtime-core';
import MainInfoSelectArrow from '../assets/icons/MainInfoSelectArrow.vue';

export default defineComponent({
  components: {
    MainInfoSelectArrow
  },
  data() {
    return {
      locations: [
        'Berlin',
        'Poland Office',
        'Venice Office',
        'Mexico',
        'USA Office',
        'Ukraine',
        'Canada',
      ],
      locationsData: {
        mainLocation: '',
        availableLocations: [],
      },
    }
  },
  computed: {
    selectAll() {
      return (
        this.locations.length === this.locationsData.availableLocations.length
      );
    },
    disabled() {
      return this.$store.getters.getFormSent;
    },
  },
  emits: ['handleLocations'],
  methods: {
    selectedLocations(value) {
      this.locationsData.availableLocations = value ? [...this.locations] : [];
    },
    handleSubmit() {
      this.$store.commit('SET_LOCATIONS_DATA', this.locationsData);
    },
    nextPage() {
      this.handleSubmit();
      this.$emit('handleLocations');
    },
  },
  created() {
    this.locationsData = this.$store.getters.getLocationsData;
  },
});
</script>

<template>
  <div class="locations">
    <div class="locations__content">
      <div class="form-select">
        <label class="text-label">Main Location <span class="after-main">*</span></label>
        <select
          id="main-location"
          v-model="locationsData.mainLocation"
          :disabled="disabled"
        >
          <option disabled selected value="">Choose location</option>
          <option value="Precoro">Main US</option>
        </select>
        <main-info-select-arrow></main-info-select-arrow>
        <div class="select-all">
          <select-checkbox
            @update:modelValue="selectedLocations"
            :modelValue="selectAll"
            label="Select All Locations"
            :disabled="disabled"
          />
        </div>
        <div class="available">
          <div class="text-title">Available Locations</div>
          <div class="content">
              <select-checkbox
                v-for="location in locations"
                :key="location"
                :value="location"
                :label="location"
                v-model="locationsData.availableLocations"
                :disabled="disabled"
              >
              </select-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="locations__footer">
      <button-component link to="/roles" @click="nextPage">
        Next Step
      </button-component>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';

.locations {
  &__content {
    padding: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  &__footer {
    padding: 24px;
    display: flex;
    justify-content: flex-end;
  }
}

.form-select {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

select {
  width: 345px;
  height: 40px;

  padding-right: 8px;
  padding-left: 8px;

  appearance: none;

  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;

  color: $grey;
  background: $white;
  
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
  right: 475px;
  top: 23px;

  @include onTablet {
    right: 175px;
  }

  @include onMobile {
    right: 60px;
  }
}

select:focus {
  color: $dark-blue;
}

.text-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: $grey;
  margin-bottom: 4px;
}

.after-main {
  color: #f5455a;
}

.select-all {
  margin-top: 20px;
}
.content {
  max-width: 500px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  row-gap: 16px;

  @include onMobile {
    max-width: 430px;
    row-gap: 13px;
  }
}

.available {
  margin-top: 16px;
}

.text-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: $grey;

  @include onMobile {
    margin-bottom: 20px;
    font-size: 14px;
  }
}

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
    font-size: 14px;
  }
}
</style>