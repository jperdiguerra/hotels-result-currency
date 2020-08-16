<template>
  <div :class="[competitor ? 'competitor' : 'our-price', addStrikethrough ? 'strikethrough' : '']">
    {{ priceText }}
  </div>  
</template>

<script>
export default {
  name: "PriceItem",
  props: {
    name: String,
    value: Number,
    competitor: Boolean,
    currency: String,
    lastItem: Boolean
  },
  computed: {
    addStrikethrough() {
      return this.competitor && this.lastItem;
    },
    priceText() {
      return `${this.name} : ${this.currency} ${this.value}`;
    }
  }
}
</script>

<style scoped>
.competitor {
  font-size: small;
}

.our-price {
  font-weight: 500;
}

.strikethrough {
  text-decoration: line-through;
}
</style>
