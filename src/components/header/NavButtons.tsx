import React from 'react';
import {StyledLink} from './Header'



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
        to='login'>Login</StyledLink>
      {/* <StyledLink
        style={{}}
        to='/login'>Login</StyledLink> */}
    </>
  );
}

export default LinkBatch;