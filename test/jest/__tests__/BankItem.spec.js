import { mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest'
import BankItem from '../../../src/components/bank/BankItem'
import Vue from 'vue'

Vue.config.silent = true

const bankDataObject = {
  code: 260,
  color: '#7f0aca',
  image: 'https://pbs.twimg.com/profile_images/1435308291756802049/5aNaRJtl_400x400.jpg',
  longName: 'NU PAGAMENTOS S.A. - INSTITUIÇÃO DE PAGAMENTO',
  name: 'Nubank',
  order: null,
  pix_keys: [
    {
      bank_code: 260,
      id: 4,
      user_id: 1,
      value: '123456789',
      createdAt: '2021-10-07T06:17:44.000Z',
      updatedAt: '2021-10-07T06:17:44.000Z'
    }
  ]
}

describe('BankItem Component', () => {
  it('mounts without errors', () => {
    const wrapper = mountQuasar(BankItem, {
      quasar: {
        components: {
        }
      },
      propsData: {
        bankData: { }
      }
    })

    expect(wrapper).toBeTruthy()
  }),

  it('should show Pix Key counter message if 1 Pix Key present', async () => {
    const wrapper = mountQuasar(BankItem)
    await wrapper.setProps({ bankData: bankDataObject })

    expect(wrapper.find('.keys-counter').text()).toEqual('1 Chave cadastrada')
  }),

  it('should show pluralized Pix Key counter message if more Pix Keys present', async () => {
    const wrapper = mountQuasar(BankItem)
    const pixKeys = [
      { bank_code: 260, id: 1, user_id: 1, value: '123456789' },
      { bank_code: 260, id: 2, user_id: 1, value: '987654321' }
    ]
    bankDataObject.pix_keys = pixKeys
    await wrapper.setProps({ bankData: bankDataObject })

    expect(wrapper.find('.keys-counter').text()).toEqual('2 Chaves cadastradas')
  })
})
