import RandomNumberGen from '../../src/components/RandomNumberGen'
import vuetify from 'vuetify'
import Vue from 'vue'
import { mount } from '@vue/test-utils'


//TODO: Test Async behavior in getCoordinates()

describe("FormSubmitter", () => {
  beforeEach(() => {
    Vue.use(vuetify);
  })
  test('setup correct', () => {
    expect(true).toBe(true)
  })
  it('renders a vue instance', () => {
    expect(mount(RandomNumberGen).isVueInstance()).toBe(true);
  })

  it("user input updates requestCount when submitted", () => {
    const wrapper = mount(RandomNumberGen)
    
    const textInput = wrapper.find('.v-text-field input')
    textInput.setValue(5)
    
    wrapper.vm.$nextTick()
  
    expect(wrapper.vm.requestCount).toBe("5")
  })
})