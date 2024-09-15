import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DashHome from './DashHome';
import OrderHistoryComponent from './components/OrderHistoryComponent';
import Navbar from './components/Navbar';

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-content">
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/orders">My Orders</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/dashboard/home" element={<DashHome />} />
          <Route path="/dashboard/orders" element={<OrderHistoryComponent/>} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
