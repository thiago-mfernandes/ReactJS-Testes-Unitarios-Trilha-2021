import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

//passo como parametro qual modulo eu vou imitar, no caso o useRouter. Entao passo o pacote de importacao
jest.mock('next/router', () => {
  //minha funcao retorna:
  return {
    //esta funcao que retorna
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    //funcao render renderiza um componente na jestdom virtualmente
    const { debug } = render(
      //renderizo meu componente, passo as props dele. Esse componente esta completamente desconexo do restante da aplicacao. No primeiro teste, esse componente precisa utilizar um useRouter e pegar um asPath. Para utilizar uma funcao externa ao componente, utilizar um mock do jest. Acima...
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
    //debug() //funciona como um console.log()

    //o que eu espero apos a renderizacao
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
  
  it('adds active class if the link as currently active', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(screen.getByText('Home')).toHaveClass('active')
  })
})
