import React from 'react'
import OrderFood from './components/OrderFood'
import Navbar from './components/Navbar'

const DashHome: React.FC = () => {
  return (
    <>
    <Navbar />
    <OrderFood />
    </>
  )
}

export default DashHome