import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import MainRoutes from './routes/main-routes';
import { useParams } from 'react-router-dom';
import { verifyUser } from './api-requests/user-requests';
import { useSelector, useDispatch } from 'react-redux'
import { setUserState,  } from './redux/features/user';
import type { RootState } from './redux/store';


const App = () =>{
  const paramsRef = useParams()
  const dispatch = useDispatch()
  const setUser = useSelector((state: RootState) => state.user)


  React.useEffect(()=>{
    // axios.get('https://localhost:7025/api/users').then(res=>{
    //   console.log(res.data)
    // })
    console.log(setUser)
    dispatch(setUserState())
    

    verifyUser().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })

    console.log(paramsRef)

  },[])

  React.useEffect(() => {
    console.log(setUser)
  }, [setUser]);


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
