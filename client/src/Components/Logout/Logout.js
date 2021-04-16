import React from 'react';
import {useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../App'

export default function Logout(){
    const {state,dispatch} = useContext(UserContext)
    const history= useHistory();

  useEffect(()=>{
    fetch('/api/logout',{
        method: 'GET',
        headers: {
            Accept: "application/json",
            "content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"

    })
    .then((res)=>{
        dispatch({type:"USER", payload:false})
        history.push('/login');
        if(res.status!==200){
            const error = new Error(res.error);
            throw error;
        }
    })
    .catch((err)=>{
        console.log(err);
    })

  });
  return(<>
  logout page
  </>)
   
}