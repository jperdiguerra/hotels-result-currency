<template>
  <div>
    <vue-select
      class="dropdown"
      v-model="selected"
      :options="choices"
      placeholder="-- Select Currency --"
      @input="onInput"
    ></vue-select>
  </div>
</template>

<script>
export default {
  name: "CurrencyDropdown",
  data() {
    return {
      choices: ['USD', 'SGD', 'CNY', 'KRW'],
      selected: ''
    };
  },
  props: {
    defaultCurrency: String
  },
  methods: {
    onInput() {
      let currency = this.selected ? this.selected : this.defaultCurrency;
      this.$emit('currency-change', currency);
    }
  }
}
</script>

<style scoped>
</style>
