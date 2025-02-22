import React from 'react'
import { useUser } from '../Context'

const LoginPage = () => {
 const {userInfo,setUserInfo,users,setisLogin,error} = useUser()

 const userClick = (id,name) => {
  setisLogin(true)
  setUserInfo({id,name})
  
 }
  
   return (
     <div className='login-comp'>
      <h1>
      Welcome to <span style={{ fontWeight: 'bolder',padding:'4px',borderRadius:'4px', color: '#ff6347',backgroundColor:'rgba(100,100,100,10)' }}>Codo.</span><br />where code meets magic!
    </h1>
      <h2>Choose your user:</h2>
         
         {Array.isArray(users) && users[0] ? users.map((i)=>(
             <div onClick={() => userClick(i.id,i.name)} className='user-login' key={i.id}>{i.name}</div>) 
          ) :
         <p>{error && error}</p>}
       
         
     </div>
   )
}

export default LoginPage