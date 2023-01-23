import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import MainRoutes from './routes/main-routes';
import { Navigate,  } from 'react-router-dom';
import {  useVerifyUserQuery } from './redux/features/userApi';
import { userApi } from './redux/features/userApi';
import { store } from './redux/store';


const App = () =>{
  const {data } = useVerifyUserQuery()

  React.useEffect(()=>{
   
    console.log(data)

  },[
 
    data
  ]) 

 


  return (  
    <div className="App">
       <Header />
       <main>
       {true? 
          <MainRoutes />
          : 
          <div>IS LOADING</div>
      }
       </main>
    

      <Footer />
    </div>
  );
}

export default App;
