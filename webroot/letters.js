export default class Letters {
    letters = []
    container = document.getElementById('letter-container');

    constructor() {
      // Remove previous instance data 
      this.letters = []
      this.container.innerHTML = '';
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
      const commonLetters = this.generateCommonLettersArray()
      for(let i = 0; i < number; i++){
        const randomIndex = Math.floor(Math.random() * commonLetters.length);
        this.letters.push(commonLetters[randomIndex]);
      }
    }
    createDraggableLetters(){
      // Create draggable elements
      this.letters.forEach((letter, index) => {
          const element_letter = document.createElement('div');
          element_letter.className = 'letter'
          element_letter.setAttribute('drag_letter', index); // Unique identifier
          element_letter.textContent = letter;
          element_letter.setAttribute('draggable', 'true');
          
      
          // Add drag event listeners
          element_letter.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', letter); // Pass the item's value
            event.dataTransfer.setData('drag_letter', index); // Pass the id
            element_letter.style.opacity = '0.5'; // Visual cue during drag
          });
      
          element_letter.addEventListener('dragend', () => {
            element_letter.style.opacity = '1'; // Reset after drag
          });
      
          this.container.appendChild(element_letter); // Append the element to the container
      });
    }
}
  