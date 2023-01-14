import React from 'react';
import RightColumnContainer from '../components/home-page/RightColumn/RightColumnContainer';
import LeftColumnContainer from '../components/home-page/LeftColumn/LeftColumnContainer';

const HomePage = () => {



  return (
    <div className='home-page-container'>
      <LeftColumnContainer />
      <RightColumnContainer />
    </div>
  );
}

export default HomePage;