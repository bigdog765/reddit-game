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
          //counterLabel.innerText = counter = currentCounter;
        }

        // Update counter
        if (message.type === 'updateCounter') {
          const { currentCounter } = message.data;
          //counterLabel.innerText = counter = currentCounter;
        }
      }
    });
    
    const userLetters = new Letters()
  }
}

// show the modal for 3 seconds MF
function showImageModalThenStartApp() {

  //over the MF DROP DEEZ NUTS ZONE
  const dropzone = document.getElementById('dropzone');

  // Modal element #fire
  const modal = document.createElement('div');
  modal.id = 'image-modal';
  modal.style.position = 'fixed';
  modal.style.top = '10px';
  modal.style.left = '10px';
  modal.style.width = '655px';
  modal.style.height = '385px';
  modal.style.borderRadius = '10px';

  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  // image of these nuts
  const image = document.createElement('img');
  image.src = '/public/wordstackLogo.png'; // fire logo i designed
  image.alt = 'Loading';
  image.style.maxWidth = '50%';
  image.style.maxHeight = '50%';

  modal.appendChild(image);
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.remove(); 
    new App();
  }, 3000);
}

// start app son
showImageModalThenStartApp();
