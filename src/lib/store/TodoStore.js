import { v4 as uuidv4 } from 'uuid';
import {writable} from 'svelte/store';
import { browser } from '$app/environment';

const data = browser ? JSON.parse(window.localStorage.getItem('st-todo-list')?? []) : [];

export const todos = writable(data);

todos.subscribe((value) => {
        
    if (browser) {
        localStorage.setItem('st-todo-list', JSON.stringify(value));
    }
});

export const addTodo = (todo) => {
    todos.update((currentTodos) => {
        return [...currentTodos,{id: uuidv4(), text: '', complete: false}];
    });
}

//deleteTodo function
export const deleteTodo = (id) => {
    todos.update((currentTodos) => {
        return currentTodos.filter((todo) => todo.id !== id);
    });
}

//toggleTodo function
export const toggleTodo = (id) => {
    todos.update((currentTodos) => {
        return currentTodos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    complete: !todo.complete
                };
            }
            return todo;
        });
    });
}

//editTodo function
export const editTodo = (id, text) => {
    todos.update((currentTodos) => {
        return currentTodos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text
                };
            }
            return todo;
        });
    });
}