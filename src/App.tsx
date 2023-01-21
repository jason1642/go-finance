import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import MainRoutes from './routes/main-routes';
import { Navigate,  } from 'react-router-dom';
import {  useVerifyUserQuery } from './redux/features/userApi';


const App = () =>{


  const { data, error, isLoading } = useVerifyUserQuery()
  

  React.useEffect(()=>{
   
  
    console.log(data,error, isLoading)

  },[data, error, isLoading]) 

 


  return (  
    <div className="App">
       <Header />
       <main>
       {!isLoading ? 
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
