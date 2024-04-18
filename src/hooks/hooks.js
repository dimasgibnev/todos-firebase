import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodoList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
        const productsDbRef = ref(db, 'todos');

		    return onValue(productsDbRef, (snapshot) => {
			      const loadedProducts = snapshot.val();

			      setTodoList(loadedProducts || {});
			      setIsLoading(false);
		    });
    }, []);

	const handleCheck = (id) => {
		const updatedList = todoList.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodoList(updatedList);
	};

	return { todoList, isLoading, handleCheck};
};

export const useRequestAddTodo = (todoText, setRefreshTodos, setTodoText) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		setIsCreating(true);

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoText,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos((prev) => !prev);
			})
			.catch((error) => console.log('Ошибка', error))
			.finally(() => setIsCreating(false));
	};

	const handleClick = () => {
		setIsCreating(!isCreating);
		setTodoText('')
	};

	return { requestAddTodo, isCreating, handleClick };
};

export const useRequestDeleteTodo = (setRefreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos((prev) => !prev);
			})
			.catch((error) => console.log('Ошибка', error))
			.finally(() => setIsDeleting(false));
	};

	return { requestDeleteTodo, isDeleting };
};


export const useRequestUpdateTodo = (setRefreshTodos, todoText) => {
	const requestUpdateTodo = (id) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoText,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos((prev) => !prev);
			})
			.catch((error) => console.log('Ошибка', error));
	};

	return { requestUpdateTodo };
};

