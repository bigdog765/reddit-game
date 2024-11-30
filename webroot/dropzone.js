import Cell from './cell.js'
export default class Dropzone {
    currentLetters = [] // Current letters added to zone
    dimensionX = 8
    dimensionY = 8
    constructor() {
        const dropzone = document.getElementById('dropzone');
        this.createCells(this.dimensionX, this.dimensionY, dropzone)

        
    }
    createCells(x, y, dropzone){
        for(let i = 0; i < x; i++){
            for(let j = 0; j < y; j++){
                const cell = new Cell(i,j)
                dropzone.appendChild(cell.element)
            }
        }
    }
    
}
  