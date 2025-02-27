import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = () => {
    const username = 'booklover';
    const password = 'read123';
    axios.get(`/api/login?username=${username}&password=${password}`)
      .then(response => {
        setLoginStatus(response.data);
      })
      .catch(error => {
        console.log(error);
        setLoginStatus('Login failed. Please try again.');
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <p>{loginStatus}</p>
    </div>
  );
};

export default App;