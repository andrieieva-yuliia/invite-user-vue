<script>
import { mapGetters } from 'vuex';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  computed: {
    ...mapGetters({
      getNavState: 'getNavState',
    })
  },
});
</script>

<template>
  <header class="header">
    <div class="header__content">
      <div class="header__top">
        <div class="header__top__title">Invite User</div>
      </div>
      <div class="header__bottom">
        <div class="header__nav">
          <router-link
            to="/main-info"
            class="header__nav__item"
            :class="getNavState.isMainInfoSetted
            ? 'header__nav__item__confirmed'
            : ''"
          >
            <div class="header__nav__icon">
              <span v-if="!getNavState.isMainInfoSetted">1</span>
            </div>
            <div class="header__nav__title">Main Info</div>
          </router-link>
          <router-link
            to="/available-locations"
            class="header__nav__item"
            :class="getNavState.isAvailableLocationsSetted
            ? 'header__nav__item__confirmed'
            : ''"
          >
            <div class="header__nav__icon">
              <span v-if="!getNavState.isAvailableLocationsSetted">2</span>
            </div>
            <div class="header__nav__title">Available Locations</div>
          </router-link>
          <router-link
            to="/roles"
            class="header__nav__item"
            :class="getNavState.isRolesSetted
            ? 'header__nav__item__confirmed'
            : ''"
          >
            <div class="header__nav__icon">
              <span v-if="!getNavState.isRolesSetted">3</span>
            </div>
            <div class="header__nav__title">Roles</div>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '../style/variables.scss';
@import '../style/mixins.scss';

.header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &__content {
    padding: 24px 24px 0 24px;
  }

  &__top {
    margin-bottom: 14px;
    
    &__title {
      font-size: 24px;
      font-weight: 600;
      line-height: 32px;

      color: $dark-blue;

      @include onMobile {
        font-size: 20px;
      }
    }
  }

  &__nav {
    display: flex;
    gap: 24px;

    margin-bottom: 20px;

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;

      &.router-link-active {
        &:after {
          content: "";

          display: block;
          height: 2px;

          position: absolute;
          left: 0;
          right: 0;
          bottom: -20px;

          background: $blue;
        }

        .header__nav__title,
        .header__nav__icon {
          color: $blue;
        }
      }
  
      &__confirmed {
        .header__nav__icon {
          background-image: url('../assets/icons/confirm.svg');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: 12px 10px;
          background-color: $blue;
        }
      }
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 30px;
      height: 30px;

      background: rgba(65, 90, 218, 0.05);border-radius: 50%;

      font-size: 14px;
      font-weight: 600;
      line-height: 18px;

      color: #5e6a75;
    }

    &__title {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: rgba(29, 36, 82, 0.5);

      @include onMobile {
        font-size: 14px;
      }
    }
  }
}
</style>