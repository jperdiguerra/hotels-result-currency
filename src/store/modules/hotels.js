import api from '../../api/hotels';

const state = {
  hotels: []
};

const getters = {
  allHotels: state => state.hotels
};

const actions = {
  async fetchHotels({ commit }) {
    const response = await api.fetchHotels();
    commit('setHotels', response.data);
  }
};

const mutations = {
  setHotels: (state, hotels) => {
    state.hotels = hotels;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
