import { useState } from 'react'
import { UserProvider } from './Context'
import { useUser } from './Context'

import HomePage from './comps/HomePage'

import './App.css'
import LoginPage from './comps/LoginPage'


function App() {
  const {isLogin,userInfo} = useUser()
  
  
  return (
    <div>
      {userInfo ? <HomePage></HomePage> : <LoginPage></LoginPage>}
    </div>
  );
  

  
}
export default App
