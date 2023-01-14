import React from 'react';
import MarketOverview from '../components/home-page/LeftColumn/MarketOverview/MarketOverview';
import HomeMyStocksContainer from '../components/home-page/LeftColumn/HomeMyStocks/HomeMyStocksContainer';
import styled from 'styled-components';
import Feed from '../components/home-page/RightColumn/Feed';
import LinkPortfolioNotification from '../components/home-page/RightColumn/LinkPortfolioNotification';


const Container = styled.div`
      display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
    margin-top: 29px;
    height: auto;
    gap: 15px;
    @media (max-width: 768px) {
      flex-direction: column;
  }
`;

const LeftColumnContainer = styled.div`
display: flex;
flex-direction: column;
width: calc(65% - 1rem);

@media (max-width: 768px) {
  width: 100%;
}
`;


const RightColumnContainer = styled.div`
     display: flex;
    height: 100%;
   
    flex-direction: column;
`;

interface ComponentProps {
  
}

const HomePage: React.FunctionComponent<ComponentProps> = () => {



  return (
    <Container>


          <LeftColumnContainer>
      <MarketOverview />
      <HomeMyStocksContainer />
    </LeftColumnContainer>





      <RightColumnContainer>

      <LinkPortfolioNotification />
      <Feed />
      </RightColumnContainer>
    </Container>
  );
}

export default HomePage;