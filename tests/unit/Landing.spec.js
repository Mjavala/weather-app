import Landing from '../../src/components/Landing'
import vuetify from 'vuetify'
import Vue from 'vue'
import { mount } from '@vue/test-utils'


//TODO - Test slider

describe("FormSubmitter", () => {
  beforeEach(() => {
    Vue.use(vuetify);
  })
  test('setup correct', () => {
    expect(true).toBe(true)
  })
  it('renders a vue instance', () => {
    expect(mount(Landing).isVueInstance()).toBe(true);
  })

  it("user input updates requestCount when submitted", () => {
    const wrapper = mount(Landing)
    
    wrapper.setData({locations: 6})

    wrapper.vm.locationsWrap()
    
    wrapper.vm.$nextTick()
  
    expect(wrapper.vm.locationsFinal).toBe(6)
  })
})