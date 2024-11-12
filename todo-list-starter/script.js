// Initialise tasks and their completion statuses
let todoTasks = ["Walk Chilli", "Make Dinner"];
let todoTasksStatus = [false, true]; // true indicates completed
let taskImportance = [false, false]; // tracks if each task is marked as important
let taskDueDates = ["2024-11-12", "2024-11-20"]

// Cache the DOM elements
const todoList = document.getElementById("todo-list");
const newTaskText = document.getElementById("new-task-text");
const newTaskButton = document.getElementById("new-task-button");
 
// Function to add a new task
const addTask = () => {
    const task = newTaskText.value.trim();
    const dueDate = document.getElementById("new-task-date").value;

    if (task) {
      todoTasks.push(task);
      todoTasksStatus.push(false);
      taskImportance.push(false);
      taskDueDates.push(dueDate);
      newTaskText.value = ""; // Clear the input field
      document.getElementById("new-task-date").value = "";
      updateTodoList();
    } else {
        alert("Please enter a task.");
    }
};

// Attach event listener for adding tasks
newTaskButton.addEventListener("click", addTask);

// Function to update the todo list display in the DOM
const updateTodoList = () => {
    todoList.innerHTML = ""; // Clear existing items

    todoTasks.forEach ((task, index) => {
        const taskElement = createTodoItemElement(task, index);
        todoList.appendChild(taskElement);
    });
};

const formatDateToDDMMYYYY = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
};

const moveTaskUp = (index) => {
    if (index > 0) {
        swapTasks(index, index - 1);
        updateTodoList();
    }
};

const moveTaskDown = (index) => {
    if (index < todoTasks.length - 1) { // to ensure the task is not already at the bottom
        swapTasks(index, index + 1);
        updateTodoList();
    }
};

const swapTasks = (index1, index2) => {
    [todoTasks[index1], todoTasks[index2]] = [todoTasks[index2], todoTasks[index1]];
    [todoTasksStatus[index1], todoTasksStatus[index2]] = [todoTasksStatus[index2], todoTasksStatus[index1]];
    [taskImportance[index1], taskImportance[index2]] = [taskImportance[index2], taskImportance[index1]];
    [taskDueDates[index1], taskDueDates[index2]] = [taskDueDates[index2], taskDueDates[index1]];
};

const getCategoryClass = (dueDate) => {
    const today = new Date();
    const date = new Date(dueDate);
    const timeDiff = date - today;

    if (isNaN(date)) return ""; // no class if no due date

    if (timeDiff < 0) {
        return "overdue";
    } else if (timeDiff < 7 * 24 * 60 * 1000) {
        return "due-soon"; // due within one week
    } else {
        return "upcoming";
    }
};

// Function to create a single todo item element
const createTodoItemElement = (task, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add(getCategoryClass(taskDueDates[index])); // Apply category class

    // Create a <p> element to store the task description
    const taskText = document.createElement("p");
    const dueDate = taskDueDates[index];
    taskText.innerText = `${task} (Due: ${dueDate ? formatDateToDDMMYYYY(dueDate) : "No due date"})`;

    const upButton = document.createElement("button");
    upButton.innerText = "\u2191"; // unicode escape code for up arrow
    upButton.addEventListener("click", () => moveTaskUp(index));

    const downButton = document.createElement("button");
    downButton.innerText = "\u2193"; // down arrow
    downButton.addEventListener("click", () => moveTaskDown(index));

    // Apply a CSS class to the completed items
    if (todoTasksStatus[index]) {
        taskText.classList.add("complete");
    }

    // Apply CSS if the task is important
    if (taskImportance[index]) {
        taskText.classList.add("important");
    }

    // Toggle Important Button
    const importantButton = document.createElement("button");
    importantButton.innerText = taskImportance[index] ? "Unmark Important" : "Mark Important";
    importantButton.addEventListener("click", () => toggleImportant(index));

    // Adding a button to mark each item as complete
    const completeButton = document.createElement("button");
    completeButton.innerText = todoTasksStatus[index] ? "Mark Incomplete" : "Mark Complete";
    completeButton.addEventListener("click", () => toggleComplete(index));
     
    // Append elements to the list item
    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    listItem.appendChild(importantButton);
    listItem.appendChild(upButton);
    listItem.appendChild(downButton);
    
    return listItem;
};

// Function to toggle task completion
const toggleComplete = (index) => {
    todoTasksStatus[index] = !todoTasksStatus[index];
    updateTodoList();
};

// Function to toggle importance
const toggleImportant = (index) => {
    taskImportance[index] = !taskImportance[index];
    updateTodoList()
};

updateTodoList();