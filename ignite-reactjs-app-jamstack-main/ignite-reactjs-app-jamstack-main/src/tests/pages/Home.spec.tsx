import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import { stripe } from '../../services/stripe'; //rellativo a pasta
import Home, { getStaticProps } from '../../pages';

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }} />)

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
  });

  //tessta se a home esta recebendo os dados
  it('loads initial data', async () => {
    //preciso importar o stripe da pasta de servicos
    //stripe.prices.retrieve é a funcao que esta buscando os dados
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve)
    //mockar o valor que ela retorna - aqui o stripe retorna uma Promise, entao uso o mockRESOLVED
    retriveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    //chamar a funcao getStaticProps, passando um objeto vazio. Como ele é uma funcao assincrona, await e async no meu it
    const response = await getStaticProps({})
    //conseole.log(response)

    //espero que a minha resposta seja igual a um:
    expect(response).toEqual(
      //um objeto, que expero que contenha: --nao é uma comparacao de igualdade, é parcial
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  });
})