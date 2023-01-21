import React from 'react';
import Footer from './components/footer/Footer'
import Header from './components/header/Header' 
import './App.css';
import MainRoutes from './routes/main-routes';
import { Navigate,  } from 'react-router-dom';
import type { RootState } from './redux/store';
import { useAppDispatch, useAppSelector } from './redux/store';
import {verifyUser} from './redux/async-actions/user-auth'
import { useLoginUserMutation, useGetAllUsersQuery, useVerifyUserQuery } from './redux/features/userApi';


const App = () =>{

  // const user = useAppSelector((state: RootState) => state.user)
  const { data, error, isLoading } = useVerifyUserQuery()
  // useLoginUserMutation({username: 'jason1', password: 'password'})
  
  const dispatch = useAppDispatch()

  React.useEffect(()=>{
    // axios.get('https://localhost:7025/api/users').then(res=>{
    //   console.log(res.data)
    // })
    // console.log(user)
    // dispatch(verifyUser())
  
    console.log(data,error, isLoading)

  },[data, error, isLoading]) 

 


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
