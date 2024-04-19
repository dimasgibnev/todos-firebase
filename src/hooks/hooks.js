import { useEffect, useState } from 'react';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodoList = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [todoList, setTodoList] = useState({});

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val();

			setTodoList(loadedTodos || {});
			setIsLoading(false);
		});
	}, []);

	const handleCheck = (id) => {
		const updatedList = Object.entries(todoList).map(([todoId, todo]) => {
			if (todoId === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodoList({ ...updatedList });
	};

	return { todoList, isLoading, handleCheck };
};

export const useRequestAddTodo = (todoText, setRefreshTodos, setTodoText) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		setIsCreating(true);
		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: todoText,
			completed: false,
		})
			.then((response) => {})
			.catch((error) => console.log('Ошибка', error))
			.finally(() => setIsCreating(false));
	};

	const handleClick = () => {
		setIsCreating(!isCreating);
	};

	return { requestAddTodo, isCreating, handleClick };
};

export const useRequestDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		const todoDbRef = ref(db, `todos/${id}`);

		setIsDeleting(true);
		remove(todoDbRef)
			.then((response) => {})
			.catch((error) => console.log('Ошибка', error))
			.finally(() => setIsDeleting(false));
	};

	return { requestDeleteTodo, isDeleting };
};

export const useRequestUpdateTodo = (todoText) => {
	const requestUpdateTodo = (id) => {
		const todoDbRef = ref(db, `todos/${id}`);
		set(todoDbRef, {
			title: todoText,
			completed: false,
		})
			.then((response) => {})
			.catch((error) => console.log('Ошибка', error));
	};

	return { requestUpdateTodo };
};
