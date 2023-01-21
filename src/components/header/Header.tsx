import React, { useState } from 'react'
import styled from 'styled-components'
import siteLogo from '../../images/siteLogo.png'
import { Link } from 'react-router-dom'
import NavButtons from './NavButtons'
import type {RootState} from '../../redux/store'
import { useAppSelector } from '../../redux/store'


  const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 31px;
    padding: 20px 1.5rem 1rem 2rem;
    background-color: #32323e;
  `;

  const SiteLogo = styled.img`
    height: 100px;
    width: auto;
  `;

  export const StyledLink = styled(Link)`
    color: white;
    display: block;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    padding: 6px 0px;
    font-family: Helvetica, Arial, sans-serif;
    &:hover {
    border-bottom: 1px solid #52e3c2;
    margin-top: 1px;
    }
    `;
interface ComponentProps {

}

const LogoLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
`;
const Header: React.FunctionComponent<ComponentProps>  = () => {
  // const user = useAppSelector((state: RootState) => state.user)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  console.log(windowWidth)


  return (
    <Container>
      <LogoLink to='/'>
        {/* <SiteLogo src={siteLogo} alt='Site logo' /> */}
          .Net Finance |
        </LogoLink>
      {/* {windowWidth <= 768 ? 'X' : <LinkBatch />} */}
      {/* <Menu> */}
      <StyledLink to=''>HUBS</StyledLink>
      <StyledLink to=''>CHAT</StyledLink>
      <StyledLink to=''>COMPARE</StyledLink>
      {
      <NavButtons 
      // user={user}
       />
      }
      {/* </Menu> */}
    </Container>
  );
}

export default Header;