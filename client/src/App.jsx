import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  async function fetchMessage() {
    const response = await axios.get('/api');
    setMessage(response.data.message);
  }

  async function fetchUsers() {
    const response = await axios.get('/users');
    setUsers(response.data);
  }

  React.useEffect(() => {
    fetchMessage()
    fetchUsers()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!message ? "Loading..." : message}</p>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
