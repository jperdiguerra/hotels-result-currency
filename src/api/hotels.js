import axios from 'axios';

const HOTELS_URL = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo';

export default {
  fetchHotels() {
    return axios.get(HOTELS_URL);
  }
};
