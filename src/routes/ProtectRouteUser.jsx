import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/ecom'
import { currenuser } from '../api/auth'
import LoadingToRedirect from '../routes/LoadingToRedirect'

const ProtectRouteUser = ({element}) => {

    const [ok, setOk] = useState(false)
    const user = useEcomStore((state)=> state.user)
    const token = useEcomStore((state)=> state.token)
    // console.log(token);

    useEffect(()=>{
        if(user && token){

            currenuser(token)
            .then((res)=>setOk(true))
            .catch((err)=>setOk(false))

        }
    },[])


    
  return  ok ?  element : <LoadingToRedirect />
}

export default ProtectRouteUser