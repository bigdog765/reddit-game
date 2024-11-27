export default class Letters {
    letters = []
    constructor() {
        this.setInitialLetters();
        this.createDraggableLetters()
    }
    generateCommonLettersArray() {
      // Probability of letters in english language
      const letterFrequencies = {
        E: 12.7, T: 9.1, A: 8.2, O: 7.5, I: 7.0, N: 6.7,
        S: 6.3, H: 6.1, R: 6.0, D: 4.3, L: 4.0, C: 2.8,
        U: 2.8, M: 2.4, W: 2.4, F: 2.2, G: 2.0, Y: 2.0,
        P: 1.9, B: 1.5, V: 1.0, K: 0.8, J: 0.2, X: 0.2,
        Q: 0.1, Z: 0.1
      };
  
      const lettersArray = [];
      // Populate the array based on frequency
      for (const [letter, frequency] of Object.entries(letterFrequencies)) {
        const count = Math.round(frequency * 10); // Scale frequency for granularity
        for (let i = 0; i < count; i++) {
          lettersArray.push(letter);
        }
      }
      return lettersArray;
    }
    setInitialLetters(number=7){
      this.letters = []
      const commonLetters = this.generateCommonLettersArray()
      for(let i = 0; i < number; i++){
        const randomIndex = Math.floor(Math.random() * commonLetters.length);
        this.letters.push(commonLetters[randomIndex]);
      }
    }
    createDraggableLetters(){
        const container = document.getElementById('letter-container');
        // Create draggable elements
        this.letters.forEach((letter, index) => {
            const element = document.createElement('div');
            element.textContent = letter;
            element.setAttribute('draggable', 'true');
            element.style.width = '100px';
            element.style.height = '50px';
            element.style.background = 'lightblue';
            element.style.textAlign = 'center';
            element.style.lineHeight = '50px';
            element.style.cursor = 'grab';
        
            // Add drag event listeners
            element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', letter); // Pass the item's value
            event.dataTransfer.setData('index', index); // Optionally, pass the index
            element.style.opacity = '0.5'; // Visual cue during drag
            });
        
            element.addEventListener('dragend', () => {
            element.style.opacity = '1'; // Reset after drag
            });
        
            container.appendChild(element); // Append the element to the container
        });
    }
}
  