import Letters from './letters.js'
import Dropzone from './dropzone.js'
class App {
  constructor() {
    const increaseButton = document.querySelector('#btn-increase');
    const decreaseButton = document.querySelector('#btn-decrease');
    const lettersButton = document.querySelector('#btn-letters');
    const usernameLabel = document.querySelector('#username');
    const counterLabel = document.querySelector('#counter');
    const lettersLabel = document.querySelector('#letters');
    var counter = 0;
    new Dropzone()

    // When the Devvit app sends a message with `context.ui.webView.postMessage`, this will be triggered
    window.addEventListener('message', (ev) => {
      const { type, data } = ev.data;

      // Reserved type for messages sent via `context.ui.webView.postMessage`
      if (type === 'devvit-message') {
        const { message } = data;

        // Load initial data
        if (message.type === 'initialData') {
          const { username, currentCounter } = message.data;
          usernameLabel.innerText = username;
          counterLabel.innerText = counter = currentCounter;
        }

        // Update counter
        if (message.type === 'updateCounter') {
          const { currentCounter } = message.data;
          counterLabel.innerText = counter = currentCounter;
        }
      }
    });

    increaseButton.addEventListener('click', () => {
      // Sends a message to the Devvit app
      window.parent?.postMessage(
        { type: 'setCounter', data: { newCounter: Number(counter + 1) } },
        '*'
      );
    });

    decreaseButton.addEventListener('click', () => {
      console.log("hi")
      // Sends a message to the Devvit app
      window.parent?.postMessage(
        { type: 'setCounter', data: { newCounter: Number(counter - 1) } },
        '*'
      );
    });
    lettersButton.addEventListener('click', () => {
      const userLetters = new Letters()
    });

    
  }
}

new App();
