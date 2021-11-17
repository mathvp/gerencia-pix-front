import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import * as All from 'quasar'
import Vue from 'vue'

jest.mock("../../../../src/services/PixKeyService", () => {})
jest.mock("../../../../src/services/BankService", () => {})

import BankItem from '../../../../src/components/bank/BankItem'

const { Quasar } = All

Vue.config.silent = true

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

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

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components })

  const wrapper = mount(BankItem, {
    localVue
  })
  const vm = wrapper.vm

  it('has a created hook', () => {
    expect(typeof vm.keysCountText).toBe('function')
  })

  it('accesses the shallowMount', () => {
    expect(wrapper.text()).toContain('Chave')
  })

  it('sets the correct default data', () => {
    const defaultData = BankItem.data();
    const empty = {}
    expect(defaultData.localBankData).toEqual(empty);
  })

  it('should show Pix Key counter message if 1 Pix Key present', async () => {
    await wrapper.setProps({ bankData: bankDataObject })

    wrapper.vm.setInitialValue();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.done).toBe(true);
      expect(wrapper.find('.keys-counter').text()).toEqual('1 Chave cadastrada')
    })
  })
})
