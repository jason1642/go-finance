import React from 'react'
import styled from 'styled-components'
import LinkPortfolioNotification from './LinkPortfolioNotification'
import Feed from './Feed'

interface ComponentProps {

}

const RightColumnContainer: React.FunctionComponent<ComponentProps> = () => {


  const Container = styled.div`
    display: flex;
    height: 100%;
   
    flex-direction: column;
  `;


  return (
    <Container>
      <LinkPortfolioNotification />
      <Feed />
    </Container>
  );
}

export default RightColumnContainer;