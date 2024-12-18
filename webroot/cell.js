export default class Cell {
    x
    y
    element
    letter
    submitted = false
    droppedElement
    hasDroppedElement = false
    constructor(x, y, parent) {
        this.x = x
        this.y = y
        // Create a new cell
        this.element = document.createElement('div');
        this.element.id = `cell(${x},${y})`;
        this.element.className = 'cell'


        // Dropzone functionality
        this.element.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow drop
        });

        this.element.addEventListener('drop', (event) => {
            if (this.hasDroppedElement) return; // Prevent duplicate drops
            event.preventDefault();
        
            const letterIndex = event.dataTransfer.getData('drag_letter');
            const droppedLetter = document.querySelector(`[drag_letter="${letterIndex}"]`);
            
            if (!droppedLetter) {
                console.error('Dropped letter not found for drag_letter:', letterIndex);
                return; // Exit gracefully
            }
        
            // Clone and append the dragged letter
            this.droppedElement = droppedLetter.cloneNode(true);
            this.droppedElement.style.opacity = '1';
        
            const computedStyle = window.getComputedStyle(this.element);
            this.droppedElement.style.height = computedStyle.height;
            this.droppedElement.style.width = computedStyle.width;
        
            this.element.appendChild(this.droppedElement);
            this.letter = event.dataTransfer.getData('text/plain');
            this.hasDroppedElement = true;
            parent.addLetterToCell(this);
        });
        
    }
    clear(){
        this.element.innerHTML = '';
        this.letter = undefined
        this.hasDroppedElement = false; // Allow new letters to be dropped
        this.droppedElement = null; // Clear dropped element reference
    }
    setSubmitted() {
        this.submitted = true; // Mark as submitted
        if (this.droppedElement) {
            this.droppedElement.style.backgroundColor = 'limegreen'; // Highlight the submitted cell
        }
    }
    
    
}
  