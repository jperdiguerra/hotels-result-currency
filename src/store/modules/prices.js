import api from '../../api/prices';

const state = {
  prices: null
};

const getters = {
  allPrices: state => state.prices
};

const actions = {
  async fetchPrices({ commit }, currency) {
    const response = await api.fetchPrices(currency);
    commit('setPrices', response.data);
  }
};

const mutations = {
  setPrices: (state, prices) => {
    state.prices = prices;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
