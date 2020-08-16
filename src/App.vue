<template>
  <div id="app" class="container">
    <CurrencyDropdown @currency-change="onCurrencyChange"></CurrencyDropdown>
    <HotelList class="hotel-list" :currency="currency"></HotelList>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CurrencyDropdown from './components/CurrencyDropdown';
import HotelList from './components/HotelList';

export default {
  name: 'App',
  data() {
    return {
      currency: 'USD',
    };
  },
  components: {
    CurrencyDropdown,
    HotelList
  },
  methods: {
    ...mapActions(['fetchHotels', 'fetchPrices']),
    onCurrencyChange(value) {
      this.currency = value;
      this.fetchPrices(this.currency);
    },
  },
  created() {
    if(localStorage.currency) this.currency = localStorage.currency;
    this.fetchHotels();
    this.fetchPrices(this.currency);
  },
  watch: {
    currency(newCurrency) {
      localStorage.currency = newCurrency;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.hotel-list {
  margin-top: 30px;
}
</style>
