import { shallowMount } from '@vue/test-utils'
import PriceItem from '@/components/PriceItem.vue'

describe('PriceItem.vue Test', () => {
  it('initializes with correct element', () => {
    const wrapper = shallowMount(PriceItem, {
      propsData: {
        name: 'Booking.com',
        value: 100,
        competitor: false,
        currency: 'USD',
        lastItem: false
      }
    })
    const props = wrapper.vm.$props;

    expect(wrapper.vm.$options.name).toMatch('PriceItem')
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.classes()).toContain('our-price')
    expect(wrapper.find('div').text()).toMatch(`${props.name} : ${props.currency} ${props.value}`)
  })

  it('adds correct classes', () => {
    const wrapper = shallowMount(PriceItem, {
      propsData: {
        competitor: true,
        lastItem: true
      }
    })

    expect(wrapper.classes()).toContain('competitor')
    expect(wrapper.classes()).toContain('strikethrough')
  })
})
