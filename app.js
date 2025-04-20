const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTask(taskText);
    taskInput.value = '';
    taskInput.focus();
  }
}

// Event listeners for adding tasks
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
  const menus = document.querySelectorAll('.menu-options:not(.hidden)');
  menus.forEach(menu => {
    // Check if click is outside the menu and its toggle button
    const menuBtn = menu.previousElementSibling;
    if (!menu.contains(e.target) && e.target !== menuBtn) {
      menu.classList.add('hidden');
    }
  });
});

// Create task function
function createTask(text) {
  const li = document.createElement('li');

  li.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
      <input type="checkbox" class="check-task" />
      <span class="task-text">${text}</span>
    </div>
    <div style="position: relative;">
      <button class="menu-btn">⋯</button>
      <div class="menu-options hidden">
        <button class="delete-btn">Delete</button>
      </div>
    </div>
  `;

  // Complete toggle
  li.querySelector('.check-task').addEventListener('change', (e) => {
    li.querySelector('.task-text').style.textDecoration = e.target.checked ? 'line-through' : 'none';
    li.querySelector('.task-text').style.color = e.target.checked ? '#777' : '#fff';
  });

  // Show/hide ⋯ menu
  const menuBtn = li.querySelector('.menu-btn');
  const menuOptions = li.querySelector('.menu-options');

  menuBtn.addEventListener('click', (e) => {
    // Close all other open menus first
    document.querySelectorAll('.menu-options:not(.hidden)').forEach(menu => {
      if (menu !== menuOptions) {
        menu.classList.add('hidden');
      }
    });
    
    menuOptions.classList.toggle('hidden');
    e.stopPropagation(); // Prevent document click from immediately closing it
  });

  // Delete
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });

  taskList.appendChild(li);
}

// Load saved tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  savedTasks.forEach(task => {
    createTask(task);
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-text').forEach(taskEl => {
    tasks.push(taskEl.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Uncomment these lines if you want to implement localStorage
// loadTasks();
// setInterval(saveTasks, 2000); // Save every 2 seconds