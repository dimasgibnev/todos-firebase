import { useState } from 'react';
import styles from './App.module.css';
import { Button, Loader, TodoList, InputForm} from './components';
import {
	useRequestAddTodo,
	useRequestGetTodoList,
	useRequestDeleteTodo,
	useRequestUpdateTodo,
} from './hooks/hooks';

export const App = () => {
	const [selectedSort, setSelectedSort] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [todoText, setTodoText] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const { requestAddTodo, isCreating, handleClick } = useRequestAddTodo(
		todoText,
		setTodoText,
	);
	const { todoList, isLoading, handleCheck } = useRequestGetTodoList();
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo();
	const { requestUpdateTodo } = useRequestUpdateTodo(todoText);

	const sortTodos = () => {
		setSelectedSort(!selectedSort);
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const filteredTodos = Object.entries(todoList).filter(([id, todo]) =>
		todo.title.toLowerCase().includes(searchTerm),
	);

	const getSortedTodos = () => {
		if (selectedSort) {
			const list = Object.entries(todoList).map(([id, todo]) => todo);
			return { ...[...list].sort((a, b) => a['title'].localeCompare(b['title'])) };
		} else if (searchTerm) {
			const todos = filteredTodos.reduce((acc, arr) => {
				return { ...acc, [arr[0]]: arr[1] };
			}, {});

			return todos;
		}
		return todoList;
	};

	const sortedTodos = getSortedTodos();

	return (
		<div className={styles.App}>
			{isCreating && (
				<InputForm
					label={'Создать'}
					setTodoText={setTodoText}
					todoText={todoText}
					handleSubmit={requestAddTodo}
				/>
			)}

			{isLoading ? (
				<Loader />
			) : (
				<>
					<Button
						isActive={isCreating || isUpdating || isDeleting}
						name={'todo-add-btn'}
						label={'Добавить задачу'}
						onClick={handleClick}
					/>
					{selectedSort ? (
						<Button
							name={'todo-sort-btn'}
							isActive={isCreating || isUpdating || isDeleting}
							onClick={sortTodos}
							label={'По созданию'}
						/>
					) : (
						<Button
							name={'todo-sort-btn'}
							isActive={isCreating || isUpdating || isDeleting}
							onClick={sortTodos}
							label={'По алфавиту'}
						/>
					)}

					<input
						placeholder="Поиск..."
						className={styles.input}
						type="text"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<div>
						<TodoList
							setIsUpdating={setIsUpdating}
							setTodoText={setTodoText}
							isUpdating={isUpdating}
							requestUpdateTodo={requestUpdateTodo}
							RequestDeleteTodo={requestDeleteTodo}
							isActive={isCreating || isUpdating || isDeleting}
							todoList={sortedTodos}
							handleCheck={handleCheck}
							todoText={todoText}
						/>
					</div>
				</>
			)}
		</div>
	);
};
