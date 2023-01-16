import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import HomeSearchBar from './components/search-bar/HomeSearchBar';
import MainRoutes from './routes/main-routes';
import axios from 'axios'


const App = () =>{

  React.useEffect(()=>{
    axios.get('https://localhost:7025/api/Users').then(res=>{
      console.log(res.data)
    })
  },[])

  return (
    <div className="App">
       <Header />
       <main>
            <HomeSearchBar />
    
        <MainRoutes />

       </main>
    

      <Footer />
    </div>
  );
}

export default App;
