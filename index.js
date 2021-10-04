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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        addTodo();
});

function addTodo() {
    if(input.value !== '') {
        const li = document.createElement('li');
        li.className = 'header__item header__createTodo';
        li.innerHTML = `
            <div class="header__check" onclick = "checked(this)"></div>
            <p class="header__content">
                ${input.value.charAt().toUpperCase() + input.value.slice(1)}
            </p>
            <div class="header__icon"  onclick="removeTodo(this)">
                <span></span>
                <span></span>
            </div>
        `;

        todoList.appendChild(li);
        input.value = '';

        todoItemCounter('+');
    }
}

/* ============ CHECKED TODO FUNCTION ============ */
function checked(e) {
    e.classList.toggle('checked');

    if(e.className.includes('checked'))
        todoItemCounter('-');
    else
        todoItemCounter('+');
}

/* ============ REMOVE TODO FUNCTION ============ */
function removeTodo(e) {
    e.parentElement.remove();

    if(!e.parentElement.firstElementChild.className.includes('checked'))
        todoItemCounter('-');

    removeFilter();
}

/* ============ FILTER TODO FUNCTIONS ============ */
const filterSort = document.querySelector('.header__filter-sort');
const sortItem = filterSort.querySelectorAll('.sort-item');

for(let i = 0; i < sortItem.length; i++) {
    sortItem[i].addEventListener('click', function () {
        // add active class
        for(let j = 0; j < sortItem.length; j++) {
            sortItem[j].classList.remove('active');
        }
        this.classList.add('active');

        const todoItem = todoList.querySelectorAll('.header__item');
        for(let i = 0; i < todoItem.length; i++) {
            todoItem[i].classList.add('hide');

            switch (this.id) {
                case 'sort-all':
                    todoItem[i].classList.remove('hide');
                    break;
                case 'sort-completed':
                    if(todoItem[i].firstElementChild.className.includes('checked')) {
                        console.log(todoItem[i]);
                        todoItem[i].classList.remove('hide');
                    }
                    break;
                case 'sort-active':
                    if(!todoItem[i].firstElementChild.className.includes('checked')) {
                        todoItem[i].classList.remove('hide');
                    }
                    break;
            }
        }
    });
}

/* ============ CLEAR COMPLETED TODOS ============ */
function clearCompleteds(){
    let completeds = todoList.getElementsByClassName('header__check checked');
    for(let i = completeds.length - 1; i >= 0; i--) {
        completeds[i].parentElement.remove();
    }
    removeFilter();
}

/* ============ THE NUMBER OF TODOS LEFT ============ */
function todoItemCounter(operator) {
    if(operator == '+')
        leftTodoItems++;
    if(operator == '-')
        leftTodoItems--;
    document.getElementById('left-number').innerText = leftTodoItems;
    removeFilter();
}

function removeFilter() {
    if(todoList.querySelectorAll('li').length === 0) {
        todoList.nextElementSibling.classList.add('hide');
    } else {
        todoList.nextElementSibling.classList.remove('hide');
    }
}