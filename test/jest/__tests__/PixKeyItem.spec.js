import { mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest'
import PixKeyItem from '../../../src/components/bank/PixKeyItem'
import Vue from 'vue'

Vue.config.silent = true

const pixKeyObject = {
  id: 4,
  bank_code: 260,
  value: '123456789',
  user_id: 1,
  createdAt: '2021-10-07T06:17:44.000Z',
  updatedAt: '2021-10-07T06:17:44.000Z'
}

describe('PixKeyItem Component', () => {
  it('mounts without errors', () => {
    const wrapper = mountQuasar(PixKeyItem, {
      quasar: {
        components: {
        }
      },
      propsData: {
        pixKeyData: { }
      }
    })

    expect(wrapper).toBeTruthy()
  }),

  it('should show Pix Key value', async () => {
    const wrapper = mountQuasar(PixKeyItem)
    await wrapper.setProps({ pixKeyData: pixKeyObject })

    expect(wrapper.find('.pix-key-value').text()).toEqual('123456789')
  })

  it('should show Copy Pix Key button', async () => {
    const wrapper = mountQuasar(PixKeyItem)
    await wrapper.setProps({ pixKeyData: pixKeyObject })

    expect(wrapper.find('.copy-pix-key')).toBeTruthy()
  })
})
