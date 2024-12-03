import Cell from './cell.js'
export default class Dropzone {
    letterCells = [] // Cells/letters added to zone
    dimensionX = 8
    dimensionY = 8
    constructor() {
        const dropzone = document.getElementById('dropzone');
        const submitButton = document.getElementById('submit-word');
        const clearButton = document.getElementById('clear');
        this.createCells(this.dimensionX, this.dimensionY, dropzone)

        submitButton.addEventListener('click', (event) => {
            this.submitWord()
        });
        clearButton.addEventListener('click', (event) => {
            this.clearCells()
        });
        
    }
    createCells(x, y, dropzone){
        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                const cell = new Cell(i,j,this)
                dropzone.appendChild(cell.element)
            }
        }
    }
    addLetterToCell(cell){
        this.letterCells.push(cell)
    }
    getUnsubmittedLetters(){
        return this.letterCells.filter((cell) => cell.submitted === false)
    }
    
    submitWord(){
        const unSubmittedCells = this.getUnsubmittedLetters()
        // Deal with if a word logic
        console.log('Submitting word:', unSubmittedCells[0].letter, '...')
    }
    clearCells() {
        // Clear letters that haven't been submitted
        const unsubmittedLetters = this.getUnsubmittedLetters();
        this.letterCells = this.letterCells.filter(letterCell => !unsubmittedLetters.includes(letterCell));
        
        unsubmittedLetters.forEach(cell => cell.clear());
    }
    
}
  