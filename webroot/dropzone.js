import Cell from './cell.js'
import Letters from './letters.js';
export default class Dropzone {
    letterCells = [] // Cells/letters added to zone
    dimensionX = 8
    dimensionY = 8
    letterRef
    constructor() {
        const dropzone = document.getElementById('dropzone');
        const submitButton = document.getElementById('submit-word');
        const clearButton = document.getElementById('clear');
        this.createCells(this.dimensionX, this.dimensionY, dropzone)
        this.letterRef = new Letters()

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
    areLettersAligned(letters) {
        let horizontallyAligned = true;
        let verticallyAligned = true;
        let hasHorizontalGap = false;
        let hasVerticalGap = false;
    
        let prevRow = null;
        let prevColumn = null;
    
        // Sort letters to ensure proper gap detection
        const sortedByX = [...letters].sort((a, b) => a.x - b.x);
        const sortedByY = [...letters].sort((a, b) => a.y - b.y);
    
        // Check horizontal alignment and gaps
        sortedByX.some((cell, index) => {
            let row = cell.x;
            if (prevRow !== null) {
                if (row !== prevRow + 1 && row !== prevRow) {
                    hasHorizontalGap = true; // Detect a gap
                }
            }
            if (row !== prevRow && index) {
                horizontallyAligned = false;
                return true; // Stop checking further
            }
            prevRow = row;
            return false; // Continue looping
        });
    
        // Check vertical alignment and gaps
        sortedByY.some((cell, index) => {
            let column = cell.y;
            if (prevColumn !== null) {
                if (column !== prevColumn + 1 && column !== prevColumn) {
                    hasVerticalGap = true; // Detect a gap
                }
            }
            if (column !== prevColumn && index) {
                verticallyAligned = false;
                return true; // Stop checking further
            }
            prevColumn = column;
            return false; // Continue looping
        });
    
        // Check alignment and gaps
        const isAligned = verticallyAligned || horizontallyAligned;
        const hasGap = hasHorizontalGap || hasVerticalGap;
    
        return isAligned && !hasGap
    }
    async checkIfWord(word){
        return true
        // gay asf reddit wont whitelist this domain
        const url = `https://api.datamuse.com/words?sp=${word}`
        fetch(url).then((response)=>{
            console.log(response)
        })
        const response = await fetch('https://example.com', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: 'hi' }),
        });
    }
    
    submitWord(){
        const unSubmittedCells = this.getUnsubmittedLetters()
        
        console.log('Submitting word:', unSubmittedCells[0].letter, '...')
        const aligned = this.areLettersAligned(unSubmittedCells)
        // Deal with if a word logic
        const isWord = this.checkIfWord(unSubmittedCells.toString())
        if(aligned && isWord){
            // for each unsubmitted cell make it submitted
            for(let cell of unSubmittedCells){
                cell.setSubmitted()
            }
            // give new letters
            this.letterRef.clearContainer()
            this.letterRef = new Letters()
        }
    }
    clearCells() {
        // Clear letters that haven't been submitted
        const unsubmittedLetters = this.getUnsubmittedLetters();
        this.letterCells = this.letterCells.filter(letterCell => !unsubmittedLetters.includes(letterCell));
        
        unsubmittedLetters.forEach(cell => cell.clear());
    }
}
  