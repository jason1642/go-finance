import * as React from 'react';
import styled from 'styled-components';
import LineGraphPortfolioOverview from '../components/account/LineGraphPortfolioOverview';
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
const Account: React.FunctionComponent<IAccountProps> = (props) => {
  return (
    <Container>
        <Title>Portfolio</Title>
    <LineGraphPortfolioOverview />


        This is the account page
    </Container>
  );
};

export default Account;
