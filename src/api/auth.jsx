import axios from 'axios'

export const currenuser = async(token)=> await axios.post('https://wokshop1.vercel.app/api/current-user',{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const currenadmin = async(token)=> {
    return  await axios.post('https://wokshop1.vercel.app/api/current-admin', {},{
        headers:{
            Authorization: `Bearar ${token}`
        }
    })
}