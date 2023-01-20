import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import HomeSearchBar from './components/search-bar/HomeSearchBar';
import MainRoutes from './routes/main-routes';
import { useParams } from 'react-router-dom';
import { verifyUser } from './api-requests/user-requests';


const App = () =>{
  const paramsRef = useParams()
  React.useEffect(()=>{
    // axios.get('https://localhost:7025/api/users').then(res=>{
    //   console.log(res.data)
    // })
    verifyUser().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })

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
