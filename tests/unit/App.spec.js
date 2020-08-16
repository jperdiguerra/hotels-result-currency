import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import Vuex from 'vuex'
import CurrencyDropdown from '@/components/CurrencyDropdown.vue'
import HotelList from '@/components/HotelList.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App.vue Test', () => {
  let wrapper = null
  let actions = null
  let store = null

  beforeEach(() => {
    actions = {
      fetchHotels: jest.fn(),
      fetchPrices: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })

    wrapper = shallowMount(App, { store, localVue })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct element', () => {
    expect(wrapper.vm.$options.name).toMatch('App')
    expect(wrapper.findComponent(CurrencyDropdown).exists()).toBe(true)
    expect(wrapper.findComponent(HotelList).exists()).toBe(true)
  })

  it('calls fetch methods', () => {
    expect(actions.fetchHotels).toHaveBeenCalled()
    expect(actions.fetchPrices).toHaveBeenCalled()
  })

  it('performs actions when currency-change is triggered', () => {
    const dropdown = wrapper.findComponent(CurrencyDropdown)
    const currency = 'USD'
    dropdown.vm.$emit('currency-change', currency)
    expect(wrapper.vm.$data.currency).toMatch(currency)
    expect(actions.fetchPrices).toHaveBeenCalled()
  })
})
