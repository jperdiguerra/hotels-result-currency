import { shallowMount } from '@vue/test-utils'
import PriceList from '@/components/PriceList.vue'
import PriceItem from '@/components/PriceItem.vue'

describe('PriceList.vue Test', () => {
  let wrapper = null
  const prices = {
    id: 1,
    price: 150,
    competitors: {
      'Traveloka': 200,
      'Expedia': 175
    },
    taxes_and_fees: {
      tax: 13.12,
      hotel_fees: 16.4
    }
  }

  let expectedSavingsTraveloka = {
    competitor: 'Traveloka',
    savings: (((prices.competitors['Traveloka']-prices.price)/prices.price) * 100).toFixed(2)
  }
  let expectedSavingsExpedia = {
    competitor: 'Expedia',
    savings: (((prices.competitors['Expedia']-prices.price)/prices.price) * 100).toFixed(2)
  } 

  beforeEach(() => {
    wrapper = shallowMount(PriceList, {
      propsData: {
        currency: 'SGD',
        prices: prices
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct elements', () => {
    expect(wrapper.vm.$options.name).toMatch('PriceList')
    expect(wrapper.findComponent(PriceItem).exists()).toBe(true)
    expect(wrapper.findAll('.price').length).toEqual(1)
    expect(wrapper.findAll('.tax-fees').length).toEqual(1)
    expect(wrapper.findAll('.tax-fees').at(0).text()).toMatch('Price includes taxes and fees!')
    expect(wrapper.findAll('.savings').at(0).text()).toEqual(
      `Save ${expectedSavingsTraveloka.savings}% vs ${expectedSavingsTraveloka.competitor}`
    )
    expect(wrapper.findAll('.savings').at(1).text()).toEqual(
      `Save ${expectedSavingsExpedia.savings}% vs ${expectedSavingsExpedia.competitor}`
    )
  })

  it('correctly checks if item is last when isLastItem is called', () => {
    expect(wrapper.vm.isLastItem(0)).toBe(false)
    expect(wrapper.vm.isLastItem(1)).toBe(false)
    expect(wrapper.vm.isLastItem(2)).toBe(true)
  })

  it('correctly returns rounded amount when roundAmount is called', () => {
    const sgdAmount = 979.74
    const sgdRounded = 980
    const usdAmount = 800.20
    const usdRounded = 800
    const cnyAmount = 5788.43
    const cnyRounded = 5788
    const krwAmount = 134434.8
    const krwRounded = 134400

    expect(wrapper.vm.roundAmount(sgdAmount)).toBe(sgdRounded)

    wrapper.setProps({ currency: 'USD' })
    expect(wrapper.vm.roundAmount(usdAmount)).toBe(usdRounded)

    wrapper.setProps({ currency: 'CNY' })
    expect(wrapper.vm.roundAmount(cnyAmount)).toBe(cnyRounded)

    wrapper.setProps({ currency: 'KRW' })
    expect(wrapper.vm.roundAmount(krwAmount)).toBe(krwRounded)
  })

  it('returns correct computed properties', () => {
    const localThis = {
      prices: prices,
      name: 'Us',
      currency: 'SGD',
      roundToOne: ['SGD'],
      roundAmount: PriceList.methods.roundAmount
    }

    // competitors
    const computedCompetitors = PriceList.computed.competitors.call(localThis)
    const expectedCompetitors = prices.competitors
    expect(computedCompetitors).toBe(expectedCompetitors)
    localThis.competitors = expectedCompetitors

    // ourPrice
    const computedOurPrice = PriceList.computed.ourPrice.call(localThis)
    const expectedOurPrice = prices.price
    expect(computedOurPrice).toBe(expectedOurPrice)
    localThis.ourPrice = expectedOurPrice

    // sortedPrices
    const computedSortedPrices = PriceList.computed.sortedPrices.call(localThis)
    const expectedSortedPrices = [
      ['Us', 150, true],
      ['Expedia', 175],
      ['Traveloka', 200]
    ]
    expect(computedSortedPrices[0][0]).toBe(expectedSortedPrices[0][0])
    expect(computedSortedPrices[0][1]).toBe(expectedSortedPrices[0][1])
    expect(computedSortedPrices[0][2]).toBe(expectedSortedPrices[0][2])
    expect(computedSortedPrices[1][0]).toBe(expectedSortedPrices[1][0])
    expect(computedSortedPrices[1][1]).toBe(expectedSortedPrices[1][1])
    expect(computedSortedPrices[2][0]).toBe(expectedSortedPrices[2][0])
    expect(computedSortedPrices[2][1]).toBe(expectedSortedPrices[2][1])
    localThis.sortedPrices = expectedSortedPrices

    // percentSavings
    const computedPercentSavings = PriceList.computed.percentSavings.call(localThis)
    const expectedPercentSavings = [expectedSavingsTraveloka, expectedSavingsExpedia]
    expect(computedPercentSavings[0].competitor).toBe(expectedPercentSavings[0].competitor)
    expect(computedPercentSavings[0].savings).toBe(expectedPercentSavings[0].savings)
    expect(computedPercentSavings[1].competitor).toBe(expectedPercentSavings[1].competitor)
    expect(computedPercentSavings[1].savings).toBe(expectedPercentSavings[1].savings)
    localThis.percentSavings = expectedPercentSavings

    // withSavings
    expect(PriceList.computed.withSavings.call(localThis)).toBeTruthy()
    localThis.percentSavings = []
    expect(PriceList.computed.withSavings.call(localThis)).toBeFalsy() 

    // taxesAndFees and taxesAndFeesTooltip
    const computedTaxesAndFees = PriceList.computed.taxesAndFees.call(localThis)
    const expectedTaxesAndFees = prices.taxes_and_fees
    expect(computedTaxesAndFees.tax).toBe(expectedTaxesAndFees.tax)
    expect(computedTaxesAndFees.hotel_fees).toBe(expectedTaxesAndFees.hotel_fees)
    localThis.taxesAndFees = expectedTaxesAndFees

    const computedTaxesAndFeesTooltip = PriceList.computed.taxesAndFeesTooltip.call(localThis)
    const expectedTaxesAndFeesTooltip = `Tax: ${expectedTaxesAndFees.tax}<br> Hotel fees: ${expectedTaxesAndFees.hotel_fees}`
    expect(computedTaxesAndFeesTooltip).toBe(expectedTaxesAndFeesTooltip)

    localThis.prices = null
    localThis.taxesAndFees = null
    expect(PriceList.computed.taxesAndFees.call(localThis)).toBeNull()
    expect(PriceList.computed.taxesAndFeesTooltip.call(localThis)).toMatch('')

    //priceDisplay
    expect(PriceList.computed.priceDisplay.call(localThis)).toMatch('Rates unavailable')
    localThis.prices = prices
    const computedPriceDisplay = PriceList.computed.priceDisplay.call(localThis)
    const expectedPriceDisplay = `${localThis.currency} ${localThis.ourPrice}`
    expect(computedPriceDisplay).toMatch(expectedPriceDisplay)
  })
})
