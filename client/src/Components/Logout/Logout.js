import React from 'react';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';


export default function Logout(){
   
const history= useHistory();

  useEffect(()=>{
        localStorage.removeItem("user")
        history.push('/login');
        }
    ,[]);
  return(<>
  logout page
  </>)
   
}