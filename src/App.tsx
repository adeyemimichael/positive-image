import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Teachers from './pages/Teachers';
import Contact from './pages/Contact';
import Management from './pages/Mangements';
import Gallery from './pages/Gallery';
import Payment from './pages/Payment';
import PaymentCallback from './pages/PaymentCallback';
import RegistrationSuccess from './pages/RegistrationSuccess';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/management" element={<Management />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;