import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'


  const StyledLink = styled(Link)`
  color: white;
  display: block;
  font-size: 12px;
  font-weight: bold;
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

const LinkBatch: React.FunctionComponent<ComponentProps>  = () => {


  return (
    <>
      <StyledLink to=''>HOME</StyledLink>
      <StyledLink to=''>PORTFOLIO</StyledLink>
      <StyledLink to=''>HUBS</StyledLink>
      <StyledLink to=''>CHAT</StyledLink>
      <StyledLink to=''>COMPARE</StyledLink>
      <StyledLink to=''>SCREENER</StyledLink>
      <div style={{ flexGrow: .7, display: 'flex' }}></div>
      <StyledLink to=''>HELP</StyledLink>
      <StyledLink to=''>FEEDBACK</StyledLink>
      <StyledLink
        style={{
          backgroundColor: '#52e3c2',
          padding: '.7rem 1rem',
          color: 'black',
          borderRadius: '3px',
        }}
        to=''>Upgrade</StyledLink>
      <StyledLink
        style={{}}
        to='/login'>Login</StyledLink>
    </>
  );
}

export default LinkBatch;