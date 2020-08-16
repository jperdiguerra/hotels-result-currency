<template>
  <li class="list-group-item">
    <div class="info">
      <img :src="hotel.photo">
      <div class="details">
        <div class="name">
          <strong>
            <u>{{ hotel.name }}</u>
            <span class="star">{{ star }}</span>
          </strong>
        </div>
        <div class="address">{{ hotel.address }}</div>
        <div class="rating"><strong>{{ rating }}</strong></div>
      </div>
      <PriceList class="price-list"
        :prices="prices"
        :currency="currency"
      ></PriceList>
    </div>
    <div class="description" v-html="hotel.description"></div>
  </li>  
</template>

<script>
import PriceList from './PriceList';

export default {
  name: "HotelItem",
  components: {
    PriceList
  },
  data() {
    return {
      ratingText: {
        '6': 'Good',
        '7': 'Very Good',
        '8': 'Fabulous',
        '9': 'Superb',
        '10': 'Exceptional'
      }
    };
  },
  props: {
    hotel: Object,
    prices: Object,
    currency: String
  },
  computed: {
    star() {
      return `(${this.hotel.stars} - star)`;
    },
    rating() {
      var text = this.ratingText[Math.floor(this.hotel.rating)];
      return text ? `${text} - ${this.hotel.rating}` : this.hotel.rating;
    }
  }
}
</script>

<style scoped>
li {
  cursor: pointer;
}

li:hover {
  background-color: #eeeeee;
}

img {
  height: 200px;
  width: 300px;
  margin-bottom: 20px;
  margin-right: 20px;
}

.info {
  display: flex;
}

.details {
  text-align: left;
  flex-grow: 2;
}

.name {
  font-size: large;
}

.star {
  margin-left: 10px;
}

.price-list {
  text-align: left;
  margin-left: 10px;
}
</style>
