/* ============ LIGHT / DARK MODE ============ */
const mode = document.querySelector('.header__mode');
const variables = document.querySelector(':root');
const modeImg = document.querySelector('.header__mode-img');

mode.addEventListener('click', () => {
    variables.classList.toggle('light-root');
    modeImg.classList.toggle('animate-mode');
    document.querySelector('.header').classList.toggle('change-header-bg');

    if (variables.className === 'light-root') {
        modeImg.src = './images/icon-moon.svg';
    } else {
        modeImg.src = './images/icon-sun.svg';
    }
});

let leftTodoItems = document.querySelectorAll('li').length;
document.getElementById('left-number').innerText = leftTodoItems;

/* ============ ADD TODO ============ */
const input = document.querySelector('.header__input');
const todoList = document.querySelector('.header__list');
let todos = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    loadFromLocalStorage();
})


document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

/* ============ ADD TODO IN LOCALSTORAGE ============ */
function addTodo() {
    if (input.value.trim()) {
        const todo = {
            item: input.value.trim(),
            checked: false
        };
        createTodo(todo);
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    input.value = '';
}

/* ============ LOAD TODOS FROM LOCALSTORAGE ============ */
function loadFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos == null || todos.length == 0) {
        document.querySelector('.header__filter').classList.add('hide');
    } else {
        for (let todo of todos) {
            createTodo(todo);
        }
    }
}

/* ============ CREATE TODO FUNCTION ============ */
function createTodo(todo) {
    console.log(todo, 1111);
    const li = document.createElement('li');
    li.className = 'header__item header__createTodo';
    li.innerHTML = `
        <div class='header__check ${todo.checked ? "checked" : ""}' onclick = "checked(this)"></div>
        <p class="header__content">${todo.item}</p>
        <div class="header__icon"  onclick="removeTodo(this)">
            <span></span>
            <span></span>
        </div>
    `;
    todoList.appendChild(li);
    todoItemCounter('+');
}

/* ============ CHECKED TODO FUNCTION ============ */
function checked(e) {
    e.classList.toggle('checked');

    const todos = JSON.parse(localStorage.getItem('todos'));
    const todoText = e.parentElement.innerText.trim();

    if (e.className.includes('checked')) {
        todos.find(todo => todo.item == todoText).checked = true;
        localStorage.setItem('todos', JSON.stringify(todos));
        todoItemCounter('-');
    } else {
        todoItemCounter('+');
        todos.find(todo => todo.item == todoText).checked = false;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

/* ============ REMOVE TODO FUNCTION ============ */
function removeTodo(e) {
    e.parentElement.remove();
    const todos = JSON.parse(localStorage.getItem('todos'));
    const deleteItem = e.previousElementSibling.innerText.trim();
    todos.splice(todos.indexOf({ item: deleteItem }), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    if (!e.parentElement.firstElementChild.className.includes('checked'))
        todoItemCounter('-');

    removeFilter();
}

/* ============ FILTER TODO ============ */
const filterSort = document.querySelector('.header__filter-sort');
const sortItem = filterSort.querySelectorAll('.sort-item');

for (let i = 0; i < sortItem.length; i++) {
    sortItem[i].addEventListener('click', function () {
        // add active class
        for (let item of sortItem) {
            item.classList.remove('active');
        }
        this.classList.add('active');

        // sort all, active, completed todos
        const todoItems = todoList.querySelectorAll('.header__item');
        for (let todoItem of todoItems) {
            todoItem.classList.add('hide');

            switch (this.id) {
                case 'sort-all':
                    todoItem.classList.remove('hide');
                    break;
                case 'sort-completed':
                    if (todoItem.firstElementChild.className.includes('checked')) {
                        todoItem.classList.remove('hide');
                    }
                    break;
                case 'sort-active':
                    if (!todoItem.firstElementChild.className.includes('checked')) {
                        todoItem.classList.remove('hide');
                    }
                    break;
            }
        }
    });
}

/* ============ CLEAR COMPLETED TODOS ============ */
function clearCompleteds() {
    let completeds = todoList.getElementsByClassName('header__check checked');

    const todos = JSON.parse(localStorage.getItem('todos')),
        completedsArr = [];

    for (let i = completeds.length - 1; i >= 0; i--) {
        completedsArr.push(completeds[i].nextElementSibling.innerText);
        completeds[i].parentElement.remove();
    }

    const leftTodos = todos.filter(todo => !todo.checked);

    localStorage.setItem('todos', JSON.stringify(leftTodos));

    removeFilter();
}

/* ============ THE NUMBER OF TODOS LEFT ============ */
function todoItemCounter(operator) {
    if (operator == '+')
        leftTodoItems++;
    if (operator == '-')
        leftTodoItems--;
    document.getElementById('left-number').innerText = leftTodoItems;
    removeFilter();
}

// If there are not todos header__filter div is hidden
function removeFilter() {
    if (todoList.querySelectorAll('li').length === 0) {
        todoList.nextElementSibling.classList.add('hide');
    } else {
        todoList.nextElementSibling.classList.remove('hide');
    }
}

new Sortable(todoList, { animation: 350 });