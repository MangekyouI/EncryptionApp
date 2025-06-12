import './App.css';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Messages from "./pages/messages/Messages";
import Encryption from "./pages/encryption/Encryption";
import  {AuthProvider, AuthContext} from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<RedirectRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/encryption" element={<PrivateRoute><Encryption /></PrivateRoute>} />
        </Routes>
        <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

function RedirectRoute() {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

export default App;
