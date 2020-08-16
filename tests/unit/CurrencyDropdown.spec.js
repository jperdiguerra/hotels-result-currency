import { shallowMount } from '@vue/test-utils'
import CurrencyDropdown from '@/components/CurrencyDropdown.vue'
import VueSelect from 'vue-select'

describe('CurrencyDropdown.vue Test', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(CurrencyDropdown)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct element', () => {
    expect(wrapper.vm.$options.name).toMatch('CurrencyDropdown')
    expect(wrapper.findComponent(VueSelect).exists()).toBe(true)
  })

  it('emits custom event when a choice is selected', () => {
    wrapper.findComponent(VueSelect).vm.$emit('input', 'USD')
    expect(wrapper.emitted('currency-change')[0][0]).toMatch('USD')
    expect(wrapper.emitted('currency-change').length).toBe(1)
  })
})
