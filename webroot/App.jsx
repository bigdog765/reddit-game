import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [username, setUsername] = useState('Guest');
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Handle messages from parent window
    const handleMessage = (event) => {
      const { type, data } = event.data;

      if (type === 'devvit-message') {
        const { message } = data;

        setMessage(JSON.stringify(message, undefined, 2));

        if (message.type === 'initialData') {
          const { username, currentCounter } = message.data;
          setUsername(username);
          setCounter(currentCounter);
        }

        if (message.type === 'updateCounter') {
          const { currentCounter } = message.data;
          setCounter(currentCounter);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleIncrease = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    window.parent?.postMessage(
      { type: 'setCounter', data: { newCounter } },
      '*'
    );
  };

  const handleDecrease = () => {
    const newCounter = counter - 1;
    setCounter(newCounter);
    window.parent?.postMessage(
      { type: 'setCounter', data: { newCounter } },
      '*'
    );
  };

  return (
    <div className="app">
      <h1>This is your page.html</h1>
      <h3>
        Your username is <span id="username">{username}</span>
      </h3>
      <h3>
        Current counter is at: <span id="counter">{counter}</span>
      </h3>
      <div className="button-container">
        <button id="btn-increase" onClick={handleIncrease}>
          Increase Counter ⬆️
        </button>
        <button id="btn-decrease" onClick={handleDecrease}>
          Decrease Counter ⬇️
        </button>
      </div>
      <h3>Last message from Devvit blocks:</h3>
      <pre id="messageOutput">{message}</pre>
    </div>
  );
};

export default App;
