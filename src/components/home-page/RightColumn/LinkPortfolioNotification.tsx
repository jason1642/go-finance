import React from 'react'
import styled from 'styled-components'

  const Container = styled.div` display: flex;
  padding: 2rem 3rem;
  margin-bottom: 2rem;
  border-radius: 20px;
  background-color: #393945;

  `;

  const Title = styled.div` font-size: 24px;
  margin-right: 1rem;
  font-weight: 400;
  color: #8f94ab;
  `;
  const TextRow = styled.div` display: flex;
  align-items: flex-start;
  justify-content: space-between;
  `;

  const LinkButton = styled.div` display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: #40c4ff;
  padding: 4px 12px;
  align-items: center;
  border-radius: 30px;
  justify-content: center;
  margin-left: 12px;
  min-width: 150px;
  background-color: #4d505f;

  &:hover {
    cursor: pointer;
    /* background-color: #bab9b9; */
  }

  `;

interface ComponentProps {
  
}
const LinkPortfolioNotification: React.FunctionComponent<ComponentProps>  = () => {

  return (<Container>
    <TextRow>
      <Title> My Portfolio </Title>
      <LinkButton> LINK PORTFOLIO NOW </LinkButton>
    </TextRow>

  </Container>)
}


export default LinkPortfolioNotification