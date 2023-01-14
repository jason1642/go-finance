import React from 'react'
import styled from 'styled-components'
import MarketOverview from './MarketOverview/MarketOverview'
import HomeMyStocksContainer from './HomeMyStocks/HomeMyStocksContainer'

interface ComponentProps {

}

const LeftColumnContainer: React.FunctionComponent<ComponentProps> = () => {

  const Container = styled.div`
        display: flex;
        flex-direction: column;
        width: calc(67% - 1rem);

        @media (max-width: 768px) {
          width: 100%;
  }
    `;
  return (
    <Container>
      <MarketOverview />
      <HomeMyStocksContainer />
    </Container>
  );
}

export default LeftColumnContainer;