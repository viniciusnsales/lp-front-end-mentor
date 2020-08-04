import setMask from './setMask'

const Mask = () => {
  setMask('.js-mask-phone', {
    mask: [
      {
        mask: '(00) 0000-0000',
      },
      {
        mask: '(00) 00000-0000',
      },
    ],
  })

  setMask('.js-mask-phone-ddd', {
    mask: '(00)',
    lazy: false,
  })

  setMask('.js-mask-phone-number', {
    mask: [
      {
        mask: '0000-0000',
      },
      {
        mask: '00000-0000',
      },
    ],
  })

  setMask('.js-mask-date', {
    mask: Date,
    lazy: false,
  })

  setMask('.js-mask-cpf', {
    mask: '000.000.000-00',
  })

  setMask('.js-mask-cnpj', {
    mask: '00.000.000/0000-00',
  })

  setMask('.js-mask-cpf-or-cnpj', {
    mask: [
      {
        mask: '000.000.000-00',
      },
      {
        mask: '00.000.000/0000-00',
      },
    ],
  })

  setMask('.js-mask-postalcode', {
    mask: '00000-000',
  })

  setMask('.js-mask-money', {
    mask: 'R$ num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: '.',
        radix: ',',
      },
    },
  })
}

export default Mask
