// in the name of allah
const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

// global vriable thatll hold todos info on the screen
let todos = [];

create_btn_el.addEventListener('click', CreateNewTodo);

// function CreateNewTodo() {
//     // a new Todo object
//     const item = {
//         id: new Date().getTime(),
//         text: "",
//         complete: false
//     }
//     todos.unshift(item);

//     const { item_el, input_el } = CreateTodoElement(item);

//     list_el.prepend(item_el);

//     input_el.removeAttribute("disabled");
//     input_el.focus();

//     save(); //this will save our data to the local storage
// }
function CreateNewTodo() {
    // check the number of tasks if its 50 
    if (todos.length >= 50) {
        alert("You have reached the maximum number of tasks.");
        return;
    }
    // a new Todo object
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }
    // check if todo already exists in array
    if (todos.find(todo => todo.id === item.id)) {
        return;
    }
    todos.unshift(item);

    const { item_el, input_el } = CreateTodoElement(item);

    list_el.prepend(item_el);

    input_el.removeAttribute("disabled");
    input_el.focus();

    save(); //this will save our data to the local storage
}


  
// start of Create Rodo Element function
function CreateTodoElement(item) {
    const item_el = document.createElement("div");
    item_el.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        item_el.classList.add("complete");
    }

    const input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value = item.text;
    input_el.setAttribute("disabled", "");

    const actions_el = document.createElement("div");
    actions_el.classList.add("actions");

    const edit_btn_el = document.createElement("button");
    edit_btn_el.classList.add("material-icons");
    edit_btn_el.innerHTML = '<span class="material-symbols-outlined icon">edit</span>';

    const remove_btn_el = document.createElement("button");
    remove_btn_el.classList.add("material-icons", "remove-btn");
    remove_btn_el.innerHTML = '<span class="material-symbols-outlined icon">close</span>';

    actions_el.append(edit_btn_el);
    actions_el.append(remove_btn_el);

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(actions_el);

    // events when creating the elements
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            item_el.classList.add("complete");
        } else {
            item_el.classList.remove("complete");
        }

        save();
    });

    input_el.addEventListener('input', () => {
        item.text = input_el.value;
    });

    input_el.addEventListener("blur", () => {
        input_el.setAttribute("disabled", "");
        save();
    });

    edit_btn_el.addEventListener("click", () => {
        input_el.removeAttribute("disabled");
        input_el.focus();
    });

    remove_btn_el.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);

        item_el.remove();

        save();
    });

    return { item_el, input_el, edit_btn_el, remove_btn_el }

}
// to make the Tasks when refreshing 
function DisplayTodos() {
	load();

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];

		const { item_el } = CreateTodoElement(item);

		list_el.append(item_el);
	}
}

DisplayTodos();

// to remove the removed tasks from the local storage
function save() {
    // Remove deleted items from the `todos` array
    todos = todos.filter(todo => !todo.deleted);
  
    // Save the updated `todos` array to local storage
    const save = JSON.stringify(todos);
    localStorage.setItem("tasks", save);
  }
  

function load() {
    const data = localStorage.getItem("tasks");

    if (data) {
        todos = JSON.parse(data);
    }
}


  
  
