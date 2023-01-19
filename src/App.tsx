import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import HomeSearchBar from './components/search-bar/HomeSearchBar';
import MainRoutes from './routes/main-routes';
import axios from 'axios'
import { useParams } from 'react-router-dom';



const App = () =>{
  const paramsRef = useParams()
  React.useEffect(()=>{
    // axios.get('https://localhost:7025/api/users').then(res=>{
    //   console.log(res.data)
    // })


    console.log(paramsRef)

  },[paramsRef])

  return (
    <div className="App">
       <Header />
       <main>
        {/* Change conditional method  */}
    
        <MainRoutes />

       </main>
    

      <Footer />
    </div>
  );
}

export default App;
