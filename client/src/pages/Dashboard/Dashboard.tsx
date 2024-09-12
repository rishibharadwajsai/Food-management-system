import React from 'react'
import Navbar from './components/Navbar'
import OrderFood from './components/OrderFood'
import OrderHistoryComponent from './components/OrderHistoryComponent'

const Dashboard: React.FC = () => {
  return (
    <>
    <Navbar />
    <OrderFood />
    <OrderHistoryComponent />
    </>
  )
}

export default Dashboard