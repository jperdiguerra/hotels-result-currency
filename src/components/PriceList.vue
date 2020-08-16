<template>
  <div>
    <div class="bg-success price">
      <strong>{{ priceDisplay }}</strong><sup v-if="taxesAndFees">*</sup>
      <div class="tax-fees" name="tax-fees"
        v-if="taxesAndFees"
        v-tooltip.top-center="taxesAndFeesTooltip"
      >
        * Price includes taxes and fees!
      </div>
    </div>

    <template v-if="withSavings">
      <div
        class="savings"
        v-for="percentSaving in percentSavings"
        :key="percentSaving.competitor"
      >
        <strong>
          <u>{{ `Save ${percentSaving.savings}% vs ${percentSaving.competitor}` }}</u>
        </strong>
      </div>
    </template>
    <PriceItem
      v-for="(price, index) in sortedPrices"
      :key="index"
      :name="price[0]"
      :value="roundAmount(price[1])"
      :competitor="!price[2]"
      :currency="currency"
      :lastItem='isLastItem(index)'
    >
    </PriceItem>
  </div>
</template>

<script>
import PriceItem from './PriceItem';

export default {
  name: "PriceList",
  data() {
    return {
      name: 'Us',
      roundToOne: ['USD', 'SGD', 'CNY'],
      roundToHundred: ['KRW', 'JPY', 'IDR']
    };
  },
  components: {
    PriceItem
  },
  props: {
    prices: Object,
    currency: String
  },
  computed: {
    competitors() {
      return this.prices && this.prices.competitors ? this.prices.competitors : null; 
    },
    ourPrice() {
      return this.prices ? this.roundAmount(this.prices.price) : 0;
    },
    sortedPrices() {
      if(!this.competitors) return [];
      let all = Object.entries(this.competitors);
      all.push([this.name, this.ourPrice, true]);
      let sorted = all.sort((a, b) => (a[1] > b[1]) ? 1 : -1);
      return sorted;
    },
    percentSavings() {
      if(!this.competitors) return [];
      let percentSavings = [];
      for(const competitor in this.competitors) {
        let competitorPrice = this.competitors[competitor]
        if(competitorPrice > this.ourPrice) {
          let diff = competitorPrice - this.ourPrice;
          let savings = ((diff/this.ourPrice) * 100).toFixed(2);
          percentSavings.push({competitor, savings});
        }
      }
      return percentSavings;
    },
    priceDisplay() {
      return this.prices ? `${this.currency} ${this.ourPrice}` : 'Rates unavailable';
    },
    withSavings() {
      return this.percentSavings.length > 0;
    },
    taxesAndFees() {
      return this.prices ? this.prices.taxes_and_fees : null;
    },
    taxesAndFeesTooltip() {
      if(!this.taxesAndFees) return '';
      return `Tax: ${this.taxesAndFees.tax}<br> Hotel fees: ${this.taxesAndFees.hotel_fees}`;
    }
  },
  methods: {
    isLastItem(index) {
      return this.sortedPrices.length - 1 == index;
    },
    roundAmount(amount) {
      if(this.roundToOne.includes(this.currency)) return Math.round(amount);
      if(this.roundToHundred.includes(this.currency)) return (Math.round(amount/100) * 100);
      return amount;
    }
  }
}
</script>

<style scoped>
sup {
  top: -4px;
}

.price {
  color: white;
  padding: 10px;
  font-size: x-large;
  width: 200px;
}

.tax-fees {
  font-size: small;
}

[data-popover='tax-fees'] {
  background: #444;
  color: red;

  font-size: 12px;
  line-height: 1.5;
  margin: 5px;
}
</style>
