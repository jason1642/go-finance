import * as React from 'react';
import styled from 'styled-components';
import DonutGraphPortfolioOverview from '../components/account/DonutGraphPortfolioOverview';
import SectorDonutGraph from '../components/account/side-panel/SectorDonutGraph';
interface IAccountProps {
}

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  color: white;
`;
const Title = styled.div`
  display: flex;
  font-size: 2em;
`;


const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  flex-grow: 6;
  border: white 1px solid;
`;

const SideContainer = styled.div`
  display:flex;
  flex-direction: column;
  flex-grow: 3;
  border: 1px solid green;
`;

const Wrapper = styled.div`
  display: flex;

`;
const PanelTitle = styled.h2`
  display:flex;
  font-weight: 300;
  text-align: center;
  margin: 0 auto;
  padding: 10px;
`;

const Account: React.FunctionComponent<IAccountProps> = (props) => {
  return (
    <Container>
        <Title>Portfolio</Title>

<Wrapper>


        <MainContainer> 
    <DonutGraphPortfolioOverview />
        </MainContainer>


        <SideContainer> 
            <PanelTitle>Positions</PanelTitle>  

            <SectorDonutGraph />  
        </SideContainer>

</Wrapper>

        This is the account page
    </Container>
  );
};

export default Account;
