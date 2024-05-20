document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js--form');
    const input = document.querySelector('.js--form__input');
    const todosWrapper = document.querySelector('.js--todos-wrapper');

    const saveTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const loadTodos = () => {
        const todosJSON = localStorage.getItem('todos');
        return todosJSON ? JSON.parse(todosJSON) : [];
    };

    const createTodoElement = (todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.checked
            ? 'todo-item--checked'
            : ''
        }`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.checked;
        checkbox.addEventListener('change', () => {
            todo.checked = checkbox.checked;
            li.classList.toggle('todo-item--checked', todo.checked);
            saveTodos(todos);
        });

        const span = document.createElement('span');
        span.className = 'todo-item__description';
        span.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'todo-item__delete';
        deleteButton.textContent = 'Видалити';
        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t !== todo);
            todosWrapper.removeChild(li);
            saveTodos(todos);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        return li;
    };

    let todos = loadTodos();
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todosWrapper.appendChild(todoElement);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = input.value.trim();
        if (text === '') {
            return;
        }

        const todo = {
            text, checked: false
        };

        todos.push(todo);
        const todoElement = createTodoElement(todo);
        todosWrapper.appendChild(todoElement);
        saveTodos(todos);

        input.value = '';
    });
});
