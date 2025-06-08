const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');
const notCompleted = document.querySelector('.notCompleted');
const Completed = document.querySelector('.Completed');

let editingTask = null;

btn.addEventListener('click', handleTask);
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleTask();
});

function handleTask() {
    const taskText = input.value.trim();
    if (taskText === '') return;

    if (editingTask) {
        editingTask.querySelector('.text').textContent = taskText;
        btn.textContent = 'Add';
        input.value = '';
        editingTask = null;
    } else {
        const newTask = createTaskElement(taskText);
        notCompleted.appendChild(newTask);
        input.value = '';
    }
}

function createTaskElement(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = text;

    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';

    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    // Complete task
    checkBtn.addEventListener('click', () => {
        if (li.parentNode === notCompleted) {
            Completed.appendChild(li);
            checkBtn.innerHTML = '<i class="fa fa-undo"></i>'; // Change to undo
        } else {
            notCompleted.appendChild(li);
            checkBtn.innerHTML = '<i class="fa fa-check"></i>'; // Back to check
        }
    });

    // Delete task
    delBtn.addEventListener('click', () => li.remove());

    // Edit task
    editBtn.addEventListener('click', () => {
        input.value = span.textContent;
        btn.textContent = 'Update';
        editingTask = li;
    });

    return li;
}
