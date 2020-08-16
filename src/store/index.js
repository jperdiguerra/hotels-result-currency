import Vuex from 'vuex';
import Vue from 'vue';
import hotels from './modules/hotels';
import prices from './modules/prices';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hotels,
    prices
  }
});
