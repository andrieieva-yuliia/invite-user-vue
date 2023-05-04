<script>
import { defineComponent } from '@vue/runtime-core';

import MainInfoFooterIcon from '../assets/icons/MainInfoFooterIcon.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import AdminIcon from '../assets/icons/AdminIcon.vue';

export default defineComponent({
  components: {
    MainInfoFooterIcon,
    AdminIcon,
    ButtonComponent,
  },
  data() {
    return {
      accessCheckboxValues: ['View only', 'Create', 'Approve', 'Pay'],
      allBelow: [],
      titlesAccess: [
        {
          title: 'Warehouse requests',
          checked: [],
          access: ['View only', 'Create', 'Approve'],
        },
        {
          title: 'Purchase requests',
          checked: [],
          access: ['View only', 'Create', 'Approve'],
        },
        {
          title: 'Request for proposals',
          checked: [],
          access: ['View only', 'Create', 'Approve'],
        },
        {
          title: 'Purchase orders',
          checked: [],
          access: ['View only', 'Create', 'Approve'],
        },
        {
          title: 'Receipts',
          checked: [],
          access: ['View only', 'Create', 'Approve'],
        },
        {
          title: 'Invoices',
          checked: [],
          access: ['View only', 'Create', 'Approve', 'Pay'],
        },
        {
          title: 'Expenses',
          checked: [],
          access: ['View only', 'Create', 'Approve', 'Pay'],
        },
      ],
      allBelowManagement: [],
      managementCheckboxValues: [
        'Configuration',
        'Suppliers and items',
        'Budgets',
        'Warehouse manager',
        'Reports',
      ],
      titlesManagement: {
        selected: [],
        admin: [],
      },
    };
  },
  watch: {
    allBelow(newValue, oldValue) {
      if (oldValue.length > newValue.length) {
        let popValue = oldValue.filter((elem) => !newValue.includes(elem))[0];

        this.titlesAccess.forEach((elem) => {
          if (elem.checked.includes(popValue)) {
            elem.checked.splice(elem.checked.indexOf(popValue), 1);
          }
        });
      } else {
        newValue.forEach((checked) => {
          this.titlesAccess.forEach((elem) => {
            if (elem.access.includes(checked) && !elem.checked.includes(checked)) {
              elem.checked.push(checked);
            }
          });
        });
      }
    },
    allBelowManagement(newValue) {
      this.managementCheckboxValues.forEach((elem) => {
        if (newValue.length) {
          this.titlesManagement.selected.push(elem);
        } else {
          this.titlesManagement.selected = [];
        }
      });
    },
  },
  computed: {
    disabled() {
      return this.$store.getters.getFormSent;
    },
  },
  methods: {
    saveInformation() {
      const rolesData = {
        access: {},
        management: {},
        admin: false,
      };

      this.titlesAccess.forEach((elem) => {
        rolesData.access[elem.title] = elem.checked;
      });

      rolesData.management = this.titlesManagement.selected;

      rolesData.admin = this.titlesManagement.admin.length ? true : false;

      this.$store.commit('SET_ROLES_DATA', rolesData);
    },
    sendForm() {
      this.saveInformation();
      this.$store.commit('SET_FORM_SENT', true);

      const formInfo = this.$store.getters.getUserData;

      console.log(formInfo);
    },
  },
  created() {
    const rolesData = this.$store.getters.getRolesData;

    this.titlesAccess.forEach((elem) => {
      elem.checked = rolesData.access[elem.title];
    });

    this.titlesManagement.selected = rolesData.management;

    this.titlesManagement.admin = rolesData.admin ? ['admin'] : [];
  },
});
</script>

<template>
  <div class="roles-box">
    <div class="roles-box__top">
      <div class="roles-access">
        <div class="access-titles">
          <div class="access-to-label">Access to:</div>
          <div class="access-values">
            <div
              class="access-value"
              v-for="value in accessCheckboxValues"
              :key="value"
            >
              {{ value }}
            </div>
          </div>
        </div>
        <div class="roles-content">
          <div class="access-all-below">
            <div class="access-below">All bellow</div>
            <div class="access-checkboxes">
              <select-checkbox
                v-for="checkbox in accessCheckboxValues"
                :value="checkbox"
                :key="checkbox"
                v-model="allBelow"
                :disabled="disabled"
              />
            </div>
          </div>
          <div
            class="access-item"
            v-for="item in titlesAccess"
            :key="item.title"
          >
            <div class="access-label">{{ item.title }}</div>
            <div class="access-checkboxes">
              <select-checkbox
                v-for="value in item.access"
                :value="value"
                :key="value"
                v-model="item.checked"
                :disabled="disabled"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="roles-management">
        <div class="management-titles">
          <span class="management-title">Management:</span>
          <main-info-footer-icon></main-info-footer-icon>
        </div>
        <div class="management-item">
          <select-checkbox value="allBelow" v-model="allBelowManagement" />
          <span class="management-item-all-below"
            >All bellow</span
          >
        </div>
        <div
          class="management-item"
          v-for="value in managementCheckboxValues"
          :key="value"
        >
          <select-checkbox
            :value="value"
            v-model="titlesManagement.selected"
            :disabled="disabled"
          />
          <span class="management-text">{{ value }}</span>
        </div>
        <div class="management-item-admin">
          <select-checkbox
            value="admin"
            v-model="titlesManagement.admin"
          />
          <span class="management-text-admin">
            Admin (Full access)
            <admin-icon></admin-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="roles-message">
      <message-component>
        The user becomes a <span class="message__content_color_blue">Power user</span> if at least ONE of the following roles is selected. Approve, View only, Configuration, Suppliers and Items, Budgets, Warehouse manager.
      </message-component>
    </div>
  </div>
  <div class="roles-box__footer">
    <button-component @click="sendForm">Invite User</button-component>
  </div>
</template>

<style scoped lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';


.roles-box {
  padding: 24px 24px 32px 24px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &__footer {
    display: flex;
    justify-content: flex-end;

    padding: 24px;
  }

  &__top {
    display: grid;
    grid-template-columns: 62% 38%;

    margin-bottom: 24px;

    @include onTablet {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 550px;
    }

    @include onMobile {
      max-width: 430px;
    }
  }
}

.roles-access {
  padding-right: 15px;
  border-right: 1px solid #dddee5;

  @include onTablet {
    padding-right: 0;
    padding-bottom: 30px;

    border-bottom: 1px solid #dddee5;
    border-right: none;
  }
}
.access-titles {
  display: flex;
  justify-content: space-between;

  line-height: 150%;
  color: $grey;
  font-size: 16px;
  font-weight: 500;

  margin-bottom: 24px;

  @include onMobile {
    align-items: center;
    font-size: 14px;
  }
}

.access-to-label {
  font-weight: 600;
}
.access-label {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: $dark-blue;

  margin-right: 24px;

  @include onMobile {
    font-size: 14px;
  }
}
.access-values {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;

  @include onMobile {
    grid-template-columns: 50px 50px 50px 50px;
    column-gap: 16px;
  }
}
.access-value {
  text-align: center;
}
.access-all-below {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.access-below {
  font-weight: 600;
  font-size: 16px;
  color: $dark-blue;

  @include onMobile {
    font-size: 14px;
  }
}
.access-checkboxes {
  display: grid;
  grid-template-columns: 75px 75px 75px 75px;
  justify-items: center;

  @include onMobile {
    grid-template-columns: 50px 50px 50px 50px;
    column-gap: 16px;
  }
}
.access-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  @include onMobile {
    margin-bottom: 13px;
  }

}

.roles-management {
  padding-left: 30px;
  display: flex;
  flex-direction: column;

  @include onTablet {
    padding-left: 0;
    padding-top: 30px;
  }
}

.management-titles {
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 600;
  color: $grey;
  line-height: 150%;

  margin-bottom: 24px;

  @include onMobile {
    font-size: 14px;
  }
}

.management-title {
  margin-right: 6px;
}

.management-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: $dark-blue;

  &:last-child {
    margin-bottom: 0;
  }

  @include onMobile {
    font-size: 14px;
  }
}
.management-text-all-below {
  font-weight: 600;
}

.management-item-all-below {
  display: inline-block;
  margin-left: 16px;
  font-weight: 600;
}

.management-text {
  margin-left: 16px;
}
.management-item-admin {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: $dark-blue;
  margin-top: auto;

  &:last-child {
    margin-bottom: 0;
  }

  @include onMobile {
    font-size: 14px;
  }
}

.management-text-admin {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 16px;
}
</style>