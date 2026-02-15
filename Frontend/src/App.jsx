import { useState, Suspense, lazy } from 'react';
import './App.css';
import ServiceHub from './ServiceHub';
import { Route, Routes } from 'react-router-dom';
import Navbar from './CommonComonent/Navbar';
import CustomerDashboard from './Customers/CustomerDashboard';
import TechnicianDashboard from './Technician/TechnicianDashboard';
// Lazy load pages
const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./Login'));
const Service = lazy(() => import('./Service'));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Wrap lazy routes inside Suspense */}
      <Suspense fallback={<div className='Load'>Loading...</div>}>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<ServiceHub />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/service" element={<Service />} />
          </Route>
          <Route path="/customerdashboard" element={<CustomerDashboard/>} />
          <Route path="/techniciandashboard" element={<TechnicianDashboard/>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
