import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!message ? "Loading..." : message}</p>
      </header>
    </div>
  );
}

export default App;
