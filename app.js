const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');

let editingTask = null; // To track which task is being edited

btn.addEventListener('click', addList);
input.addEventListener('keyup', (e) => {
    (e.keyCode === 13 ? addList(e) : null);
});

function addList(e) {
    const notCompleted = document.querySelector('.notCompleted');
    const Completed = document.querySelector('.Completed');

    // Create the elements for the task
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button'); // Edit Button

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    editBtn.innerHTML = '<i class="fa fa-edit"></i>'; // Edit button icon

    // If we're editing an existing task, update it instead of adding a new one
    if (editingTask) {
        editingTask.textContent = input.value.trim(); // Update task text
        // Re-add the buttons after updating the task text
        editingTask.appendChild(checkBtn);
        editingTask.appendChild(delBtn);
        editingTask.appendChild(editBtn);
        // Reattach event listeners to the buttons
        attachButtonListeners(editingTask, checkBtn, delBtn, editBtn);
        input.value = ''; // Clear input field
        btn.textContent = 'Add'; // Reset the button text back to "Add"
        editingTask = null; // Reset editing task
    } else if (input.value.trim() !== '') {
        newLi.textContent = input.value.trim();
        notCompleted.appendChild(newLi);
        // Append the buttons for this task
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);
        newLi.appendChild(editBtn);

        // Attach event listeners to the buttons
        attachButtonListeners(newLi, checkBtn, delBtn, editBtn);
    }
}

// Function to attach event listeners to the buttons
function attachButtonListeners(task, checkBtn, delBtn, editBtn) {
    // Mark as completed
    checkBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
        const completedList = document.querySelector('.Completed');
        completedList.appendChild(parent);
        checkBtn.style.display = 'none';
    });

    // Delete task
    delBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
    });

    // Edit task functionality
    editBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        input.value = parent.firstChild.textContent.trim(); // Pre-fill input with current task text
        btn.textContent = 'Update'; // Change button text to "Update"
        editingTask = parent; // Set the task to be edited
        // Temporarily remove buttons for editing
        parent.removeChild(checkBtn);
        parent.removeChild(delBtn);
        parent.removeChild(editBtn);
    });
}
