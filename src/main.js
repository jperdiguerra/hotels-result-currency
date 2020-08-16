import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue';
import store from './store';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VTooltip from 'v-tooltip';
import './assets/css/main.css';

Vue.use(Vuex);
Vue.component('vue-select', VueSelect);
Vue.use(VTooltip);
VTooltip.options.defaultTemplate = '<div class="tooltip-vue" role="tooltip"><div class="tooltip-vue-arrow"></div><div class="tooltip-vue-inner"></div></div>';
VTooltip.options.defaultArrowSelector = '.tooltip-vue-arrow, .tooltip-vue__arrow';
VTooltip.options.defaultInnerSelector = '.tooltip-vue-inner, .tooltip-vue__inner';

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
