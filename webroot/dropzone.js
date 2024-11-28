export default class Dropzone {
    currentLetters = [] // Current letters added to zone
    constructor() {
        const dropzone = document.getElementById('dropzone');

        // Dropzone functionality
        dropzone.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow drop
        });

        dropzone.addEventListener('drop', (event) => {
            event.preventDefault();
            const dataLetter = event.dataTransfer.getData('text/plain'); // Retrieve the dropped item's value
            const letterIndex = event.dataTransfer.getData('drag_letter');
            
            const draggedElement = document.querySelector(`[drag_letter="${letterIndex}"]`); // Find the element by custom data attribute
            
            // Optionally, clone the dragged element
            const droppedElement = draggedElement.cloneNode(true);
            
            droppedElement.style.opacity = '1'; // Reset opacity if it was changed during drag
            
            // Append the exact visual object into the drop zone
            dropzone.appendChild(droppedElement);
            this.currentLetters.push(dataLetter)
            //dropzone.textContent = `Dropped: ${dataLetter}, letter queue is ${this.currentLetters}`;
        });
    }
    
}
  