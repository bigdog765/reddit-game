class App {
  letters = []
  constructor() {
    const output = document.querySelector('#messageOutput');
    const increaseButton = document.querySelector('#btn-increase');
    const decreaseButton = document.querySelector('#btn-decrease');
    const lettersButton = document.querySelector('#btn-letters');
    const usernameLabel = document.querySelector('#username');
    const counterLabel = document.querySelector('#counter');
    const lettersLabel = document.querySelector('#letters');
    var counter = 0;

    // When the Devvit app sends a message with `context.ui.webView.postMessage`, this will be triggered
    window.addEventListener('message', (ev) => {
      const { type, data } = ev.data;

      // Reserved type for messages sent via `context.ui.webView.postMessage`
      if (type === 'devvit-message') {
        const { message } = data;

        // Always output full message
        output.replaceChildren(JSON.stringify(message, undefined, 2));

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
      this.giveInitialLetters();
      lettersLabel.innerText = this.letters
    });
    

  }
  giveInitialLetters(number=12){
    this.letters = []
    const vowels = ['A','E','I','O','U']
    const randomIndex = Math.floor(Math.random() * number)
    for(let i = 0; i < number; i++){
      // Ensure at least one letter is a vowel
      if (i === randomIndex) this.letters.push(vowels[Math.floor(Math.random() * vowels.length)])
      else{
        // Generate a random uppercase letter ASCII value
        const randomAscii = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        this.letters.push(randomAscii)
      }
    }
  }
}

new App();
