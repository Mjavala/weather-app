import WeatherData from '../../src/components/WeatherData'
import vuetify from 'vuetify'
import Vue from 'vue'
import { mount } from '@vue/test-utils'

//TODO: Test Async behavior in getWeather


describe("FormSubmitter", () => {
  beforeEach(() => {
    Vue.use(vuetify);
  })
  it('renders a vue instance', () => {
    expect(mount(WeatherData).isVueInstance()).toBe(true);
  })

  it("url count correct", () => {
    const wrapper = mount(WeatherData)
    wrapper.setProps({ 
        lat: [1,2,3,4,5],
        long: [6,7,8,9,10],
    })
    wrapper.vm.$nextTick()
    wrapper.vm.buildGetURLs()
    expect(wrapper.vm.urls.length).toBe(5)
  })
})