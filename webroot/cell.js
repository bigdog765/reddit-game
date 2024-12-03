export default class Cell {
    x
    y
    element
    letter
    submitted = false
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
            event.preventDefault();
            const dataLetter = event.dataTransfer.getData('text/plain'); // Retrieve the dropped item's value
            const letterIndex = event.dataTransfer.getData('drag_letter');
            
            const draggedElement = document.querySelector(`[drag_letter="${letterIndex}"]`); // Find the element by custom data attribute
            
            // Optionally, clone the dragged element
            const droppedElement = draggedElement.cloneNode(true);

            droppedElement.style.opacity = '1'; // Reset opacity if it was changed during drag

            const computedStyle = window.getComputedStyle(this.element);
            droppedElement.style.height = computedStyle.height;
            droppedElement.style.width = computedStyle.width;
            
            // Append the exact visual object into the drop zone
            this.element.appendChild(droppedElement);
            this.letter = dataLetter
            parent.addLetterToCell(this)
        });
    }
    clear(){
        this.element.innerHTML = '';
        this.letter = undefined
    }
    
}
  