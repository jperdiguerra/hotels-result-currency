import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HotelList from '@/components/HotelList.vue'
import HotelItem from '@/components/HotelItem.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('HotelList.vue Test', () => {
  let wrapper = null
  let getters = null
  let store = null

  let hotels = [
    {
      id: 3,
      name: 'Park Hyatt Tokyo',
      rating: 9.2,
      stars: 5,
      address: '163-1055 Tokyo Prefecture, Shinjuku-ku, Nishishinjuku 3-7-1-2, Japan',
      photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/VuLE/i1_m.jpg',
      description: 'Hyatt'
    },
    {
      id: 2,
      name: 'The Ritz-Carlton, Tokyo',
      rating: 9.1,
      stars: 5,
      address: '107-6245 Tokyo Prefecture, Minato-ku, Akasaka 9-7-1 Tokyo Midtown, Japan',
      photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/NXnQ/i12_m.jpg',
      description: 'Ritz'
    }
  ]

  let prices = [
    {
      id: 2,
      price: 841
    }
  ]

  beforeEach(() => {
    getters = {
      allHotels: () => hotels,
      allPrices: () => prices
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = shallowMount(HotelList, {
      store,
      localVue,
      propsData: {
        currency: 'USD'
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct elements', () => {
    expect(wrapper.vm.$options.name).toMatch('HotelList')
    expect(wrapper.findComponent(HotelItem).exists()).toBe(true)
  })

  it('correctly returns price when getPrice is called', () => {
    expect(wrapper.vm.getPrice(2)).toBe(prices[0])
  })

  it('returns correct pricesMap', () => {
    const localThis = { allPrices: prices }
    const computedPriceMap = HotelList.computed.pricesMap.call(localThis)
    const expectedPriceMap = new Map(prices.map(p => [p.id, p]))
    const priceId = prices[0].id

    expect(computedPriceMap.get(priceId).id).toBe(expectedPriceMap.get(priceId).id)
    expect(computedPriceMap.get(priceId).price).toBe(expectedPriceMap.get(priceId).price)
  })

  it('returns correct sortedHotels', () => {
    const localThis = {
      allHotels: hotels,
      allPrices: prices,
      pricesMap: new Map(prices.map(p => [p.id, p])),
      getPrice: HotelList.methods.getPrice
    }
    const computedSortedHotels = HotelList.computed.sortedHotels.call(localThis)

    hotels[1].price = prices[0]
    let hotelWithPrice = hotels[1]
    let hotelWithoutPrice = hotels[0]
    const expectedSortedHotels = [
      hotelWithPrice,
      hotelWithoutPrice
    ]

    expect(computedSortedHotels[0].price).toBe(expectedSortedHotels[0].price)
    expect(computedSortedHotels[1].price).toBe(expectedSortedHotels[1].price)
  })
})
