document.addEventListener('DOMContentLoaded', () => {

    let input = document.getElementById("todoinput");
    let addbutton = document.getElementById("addtask");
    let todo_list = document.getElementById("todolist");

    // Load tasks from localStorage or use empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render each saved task
    tasks.forEach(task => rendertask(task));

    // Handle adding new task
    addbutton.addEventListener('click', () => {
        let tasktext = input.value.trim();
        if (tasktext === "") return;

        const newtask = {
            id: Date.now(),
            text: tasktext,
            completed: false
        };

        tasks.push(newtask);
        savetask();
        rendertask(newtask);
        input.value = "";
    });

    // Save tasks to localStorage
    function savetask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render a single task
    function rendertask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `<h5>${task.text}</h5><button>Delete</button>`;

        // Toggle task completion
        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return; // ignore clicks on delete button
            task.completed = !task.completed;
            li.classList.toggle("completed");
            savetask();
        });

        // Delete task
        li.querySelector("button").addEventListener('click', (e) => {
            e.stopPropagation(); // prevent toggling complete when deleting
            tasks = tasks.filter(t => t.id !== task.id);
            savetask();
            li.remove();
        });

        todo_list.appendChild(li);
    }

});
