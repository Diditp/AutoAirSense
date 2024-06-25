import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Main from './main';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const EMAIL = 'superadmin@aas.com';
  const PASSWORD = 'autoairsense';

  const handleLogin = () => {
    if (username === EMAIL && password === PASSWORD) {
      // Autentikasi berhasil, set state loggedIn menjadi true
      setLoggedIn(true);
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <>
      {loggedIn ? (
        <Main />
      ) : (
        <div className="relative flex items-center justify-center h-screen bg-gray-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('udaraBaik.jpg')` }}></div>
          <div className="relative bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg w-1/3 max-w-md">
            <div className='flex flex-col justify-center items-center'>
              <h2 className="text-2xl font-bold mb-4 text-center">Login To</h2>
              <h2 className="text-2xl font-bold mb-4 text-center">AutoAirSense</h2>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
