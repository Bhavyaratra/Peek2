import React from 'react';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';


export default function Logout(){
   
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