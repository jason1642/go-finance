import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import HomeSearchBar from './components/search-bar/HomeSearchBar';
import MainRoutes from './routes/main-routes';



function App () {
  return (
    <div className="App">
       <Header />
        <HomeSearchBar />
    
        <MainRoutes />


      <Footer />
    </div>
  );
}

export default App;
