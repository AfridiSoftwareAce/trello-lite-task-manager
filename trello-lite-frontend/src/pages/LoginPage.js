import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/login', { email, password });
      dispatch(setToken(res.data.token));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/register', { email, password });
      dispatch(setToken(res.data.token));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Login or Register</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', width: '250px', marginBottom: '1rem' }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', width: '250px', marginBottom: '1rem' }}
        /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
        <button type="button" onClick={handleRegister} style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
