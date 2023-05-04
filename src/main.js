import { createApp } from 'vue';

import App from './App.vue';
import router from './router/router';
import store from './store/store';

import MainBox from './components/MainBox';
import SelectCheckbox from './components/SelectCheckbox';
import MessageComponent from './components/MessageComponent';
import ButtonComponent from './components/ButtonComponent';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('main-box', MainBox);
app.component('select-checkbox', SelectCheckbox);
app.component('message-component', MessageComponent);
app.component('button-component', ButtonComponent);

app.mount('#app');