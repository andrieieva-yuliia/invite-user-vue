import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      navState: {
        isMainInfoSetted: false,
        isAvailableLocationsSetted: false,
        isRolesSetted: false
      },
      inputState: false,
      formSent: false,
      userData: {
        mainInfoData: {
          firstName: '',
          lastName:'',
          email: '',
          phone: null,
          position: '',
          company: '',
        },
        locationsData: {
          mainLocation: '',
          availableLocations: [],
        },
        rolesData: {
          access: {
            "Warehouse requests": [],
            "Purchase requests": [],
            "Request for proposals": [],
            "Purchase orders": [],
            Receipts: [],
            Invoices: [],
            Expenses: [],
          },
          management: [],
          admin: false,
        },
      },
    };
  },
    getters: {
      getNavState(state) {
        return state.navState;
      },
      getState(state) {
        return state.inputState;
      },
      getUserData(state) {
        return state.userData;
      },
      getMainInfoData(state) {
        return state.userData.mainInfoData;
      },
      getLocationsData(state) {
        return state.userData.locationsData;
      },
      getRolesData(state) {
        return state.userData.rolesData;
      },
      getFormSent(state) {
        return state.formSent;
      }
    },
    mutations: {
      SET_MAIN_INFO_DATA(state, mainInfoData) {
        state.userData.mainInfoData = mainInfoData;
        state.navState.isMainInfoSetted = true;
      },
      SET_LOCATIONS_DATA(state, locationsData) {
        state.userData.locationsData = locationsData;
        state.navState.isMainInfoSetted = true;
        state.navState.isAvailableLocationsSetted = true;
      },
      SET_ROLES_DATA(state, rolesData) {
        state.userData.rolesData = rolesData;
        state.navState.isMainInfoSetted = true;
        state.navState.isAvailableLocationsSetted = true;
        state.navState.isRolesSetted = true;
      },
      SET_FORM_SENT(state, formSent) {
        state.formSent = formSent;
      },
    },
});

export default store;
