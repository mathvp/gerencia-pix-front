import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import PixKeyItem from '../../../../src/components/bank/PixKeyItem'
import * as All from 'quasar'
import Vue from 'vue'

const { Quasar } = All

Vue.config.silent = true

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

const pixKeyObject = {
  id: 4,
  bank_code: 260,
  value: '123456789',
  user_id: 1,
  createdAt: '2021-10-07T06:17:44.000Z',
  updatedAt: '2021-10-07T06:17:44.000Z'
}

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components })

  const wrapper = mount(PixKeyItem, {
    localVue
  })
  const vm = wrapper.vm

  it('has a created hook', () => {
    expect(typeof vm.copyPixKey).toBe('function')
  })

  it('accesses the shallowMount', () => {
    expect(wrapper.text()).toContain('Chave')
  })

  it('sets the correct default data', () => {
    expect(typeof vm.$props.pixKeyData).toBe('object')
    const defaultData2 = PixKeyItem.data()
    expect(defaultData2.pixKeyValue).toBe('')
  })

  it('should show Pix Key value', async () => {
    await wrapper.setProps({ pixKeyData: pixKeyObject })

    wrapper.vm.setInitialValue()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.done).toBe(true)
      expect(PixKeyItem.data().pixKeyValue).toBe('123456789')
    })
  })
})
