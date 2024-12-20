import React from 'react'
import Contencar from '../components/home/Contencar'
import BestSeller from '../components/home/BestSeller copy.jsx'
import NewProduct from '../components/home/NewProduct'

const Home = () => {
  return (
    <div>
      <Contencar />


    <p className='text-2xl text-center my-6'>สินค้าขายดี</p>

    <BestSeller />

    <p className='text-2xl text-center my-6'>สินค้าใหม่</p>
    <NewProduct />
    </div>
  )
}

export default Home