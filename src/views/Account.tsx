import * as React from 'react';
import styled from 'styled-components';
import DonutGraphPortfolioOverview from '../components/account/DonutGraphPortfolioOverview';
interface IAccountProps {
}

const Container = styled.div`
  display: flex;
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
  flex-grow: 2;
  border: white 1px solid;
`;

const SideContainer = styled.div`
  display:flex;
  flex-direction: column;
  flex-grow: 2;
  border: 1px solid green;
`;

const Wrapper = styled.div`
  display: flex;

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

        </SideContainer>

</Wrapper>

        This is the account page
    </Container>
  );
};

export default Account;
