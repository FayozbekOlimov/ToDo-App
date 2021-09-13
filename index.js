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

/* ============ ADD TODO ============ */
const input = document.querySelector('.header__input');
const todoList = document.querySelector('.header__list');

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13 && input.value !== '') {
        const li = document.createElement('li');
        li.className = 'header__item header__createTodo';
        li.innerHTML = `
            <div class="header__check" onclick = "checked(this)"></div>
            <p class="header__content">
                ${input.value.charAt().toUpperCase() + input.value.slice(1)}
            </p>
            <div class="header__icon"  onclick="remove(this)">
                <span></span>
                <span></span>
            </div>
        `;

        document.querySelector('.header__filter').insertAdjacentElement('beforebegin', li);
        input.value = '';
    }
});

/* ============ CHECKED TODO FUNCTION ============ */
function checked(e) {
    e.classList.toggle('no-before');
    e.classList.toggle('checked');
}

/* ============ REMOVE TODO FUNCTION ============ */
function remove(e) {
    e.parentElement.remove();
}

/* ============ FILTER FUNCTIONS ============ */
const filterSort = document.querySelector('.header__filter-sort');
const sortItem = filterSort.querySelectorAll('.sort-item');

for(let i = 0; i < sortItem.length; i++) {
    sortItem[i].addEventListener('click', function (e) {
        for(let j = 0; j < sortItem.length; j++) {
            sortItem[j].classList.remove('active');
        }
        this.classList.add('active');
    });
}