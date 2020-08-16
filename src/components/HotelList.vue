<template>
  <ul class="list-group">
    <HotelItem
      v-for="hotel in allHotels"
      :key="hotel.id"
      :hotel="hotel"
      :prices="getPrice(hotel.id)"
      :currency="currency"
    >  
    </HotelItem>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import HotelItem from './HotelItem';

export default {
  name: "HotelList",
  components: {
    HotelItem
  },
  props: {
    currency: String
  },
  computed: {
    ...mapGetters(['allHotels', 'allPrices']),
    pricesMap() {
      return this.allPrices ? new Map(this.allPrices.map(p => [p.id, p])) : null;
    },
    sortedHotels() {
      if(!this.allPrices) return [];
      let sorted = [];
      let priceUnavailable = [];
      for(let hotel of this.allHotels) {
        let hotelPrices = this.getPrice(hotel.id)
        if(hotelPrices) {
          hotel.prices = hotelPrices;
          sorted.push(hotel)
        } else {
          priceUnavailable.push(hotel);
        }
      }
      if(priceUnavailable.length > 0) sorted.push(priceUnavailable);
      return sorted.flat();
    }
  },
  methods: {
    getPrice(id) {
      return this.pricesMap ? this.pricesMap.get(id) : {};
    }
  }
}
</script>

<style scoped>
</style>
