import { shallowMount } from '@vue/test-utils'
import HotelItem from '@/components/HotelItem.vue'
import PriceList from '@/components/PriceList.vue'

describe('HotelItem.vue Test', () => {
  it('initializes with correct elements', () => {
    const wrapper = shallowMount(HotelItem, {
      propsData: {
        hotel: {
          id: 1,
          photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
          name: 'Shinagawa Prince Hotel',
          rating: 7,
          stars: 4,
          address: 'Tokyo Japan',
          description: 'Prince Hotel'
        },
        prices: {
          id: 1,
          price: 164
        },
        currency: 'USD'
      }
    })
    const hotel = wrapper.vm.$props.hotel;
  
    expect(wrapper.vm.$options.name).toMatch('HotelItem')
    expect(wrapper.findComponent(PriceList).exists()).toBe(true)
    expect(wrapper.findAll('.name').length).toEqual(1)
    expect(wrapper.findAll('u').at(0).text()).toMatch(hotel.name)
    expect(wrapper.findAll('.address').at(0).text()).toMatch(hotel.address)
    expect(wrapper.findAll('.rating').at(0).text()).toMatch(`Very Good - ${hotel.rating}`)
    expect(wrapper.findAll('.star').at(0).text()).toMatch(`(${hotel.stars} - star)`)
    expect(wrapper.findAll('.description').at(0).text()).toMatch(hotel.description)
  })
})
