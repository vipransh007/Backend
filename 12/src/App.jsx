import React, { use } from 'react';
import './App.css';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login , logout} from './store/authSlice';



function App() {
  // This is the main component of the app
  // It renders a simple heading for the blog app

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    }).finally(() => setLoading(false))
   },[])

   return !loading ? (
    <div className='CondtionalRendering'></div>
   ) : null;


  return (
    <>
      <h1>A blog app using appwrite</h1>
    </>
  )
}

export default App
