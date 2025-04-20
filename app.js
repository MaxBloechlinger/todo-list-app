function addTask() {
    let input = document.getElementById("todo-input");
    let newTask = input.value;

    if (newTask === "") {
        alert("Please enter a task!");
        return;
    }

    let ul = document.getElementById("todo-list");
    let li = document.createElement("li");
    li.textContent = newTask;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function() {
        ul.removeChild(li);
    };

    li.appendChild(deleteButton);
    ul.appendChild(li);

    input.value = "";
}
