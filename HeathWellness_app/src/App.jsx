import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Navbar/Home.css';
import CustomerLogin from './Components/Navbar/CustomerLogin.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-login" element={<CustomerLogin isNewUser={false} />} />
        <Route path="/customer-register" element={<CustomerLogin isNewUser={true} />} />
      </Routes>
    </Router>
  );
}

export default App;

