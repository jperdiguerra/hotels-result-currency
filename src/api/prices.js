import axios from 'axios';

const PRICES_URL = 'http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1';

export default {
  fetchPrices(currency) {
    return axios.get(`${PRICES_URL}/${currency}`);
  }
};
