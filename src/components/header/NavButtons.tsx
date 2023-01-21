import { Button } from '@mui/material';
import React from 'react';
import {StyledLink} from './Header'



interface ComponentProps {
  user: any;
}

const LinkBatch: React.FunctionComponent<ComponentProps>  = ({user}) => {


  // React.useEffect(() => {
  //   console.log(user)
  // }, [user]);
  return (
    <>
      <StyledLink to=''>HOME</StyledLink>
      <StyledLink to=''>PORTFOLIO</StyledLink>
      {/* <StyledLink to=''>HUBS</StyledLink> */}
      <StyledLink to=''>CHAT</StyledLink>
      {/* <StyledLink to=''>COMPARE</StyledLink> */}
      {/* <StyledLink to=''>SCREENER</StyledLink> */}
      <div style={{ flexGrow: .7, display: 'flex' }}></div>
      <StyledLink to=''>HELP</StyledLink>
      <StyledLink to=''>FEEDBACK</StyledLink>

      {

      user ?   
        <Button
        onClick={()=>{console.log('trying to log out')}}
        style={{
          backgroundColor: '#52e3c2',
          padding: '.4rem .7rem',
          color: 'black',
          borderRadius: '3px',
        }}
      >Log out</Button>
     :
         <StyledLink
        style={{
          backgroundColor: '#52e3c2',
          padding: '.7rem 1rem',
          color: 'black',
          borderRadius: '3px',
        }}
        to='login'>Login</StyledLink>
        
   }
   
    </>
  );
}

export default LinkBatch;