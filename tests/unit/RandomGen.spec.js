import RandomNumberGen from '../../src/components/RandomNumberGen'
import vuetify from 'vuetify'
import Vue from 'vue'
import { mount } from '@vue/test-utils'


//TODO: Test Async behavior in getCoordinates()
// Coverage testing mock props

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
})