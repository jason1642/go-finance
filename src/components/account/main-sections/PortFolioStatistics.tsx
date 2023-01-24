import * as React from 'react';
import styled from 'styled-components';


interface IPortfolioStatisticsProps {
}

const Container = styled.div`
  display: flex;
  padding: 2rem;
  border-top: 1px solid #9b9b9b33;

`;

const Title = styled.div`
  display: flex;
  font-size: 1.5em;
`;
const PortfolioStatistics: React.FunctionComponent<IPortfolioStatisticsProps> = (props) => {
  return (
    <Container>
        <Title>Portfolio Statistics</Title>
    </Container>
  );
};

export default PortfolioStatistics;
