import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

/**
 * quando eu preciso de um mock, que tem dois comportamentos diferentes:
 * 1: renders correctly when user is not authenticated
 * 2: renders correctly when user is authenticated
 * 
 * importar a funcao que o componente precisa (useSession)
 * e dar um funcionamento diferente pra cada caso:
 * instalar ts-jest e usar a funcao mocked
 */


jest.mock('next-auth/client')

describe('SignInButton component', () => {

  it('renders correctly when user is not authenticated', () => {
    //passo pra minha funcao mocked a funcao que quero usar no teste
    const useSessionMocked = mocked(useSession)
    //e uso um valor de retorno para uma unica vez
    useSessionMocked.mockReturnValueOnce([null, false])

    const { debug } = render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    //passo pra minha funcao mocked a funcao que quero usar no teste
    const useSessionMocked = mocked(useSession)
    //e uso um valor de retorno para uma unica vez, e passo valores pra um usuario logado

    //pra descobrir qual parametro eu vou passar aqui, olhar no componente, neste caso signInButton, o que tem dentro da session, o que ela retorna, olhar lá e olhar pela tipagem do useSession
    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires' }, 
      false
    ])

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
