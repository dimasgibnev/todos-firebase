import { useRef, useState } from 'react';
import styles from './App.module.css';
import { Button, Loader, TodoList, InputForm, Select } from './components';
import {
	useRequestAddTodo,
	useRequestGetTodoList,
	useRequestDeleteTodo,
	useRequestUpdateTodo,
} from './hooks/hooks';

export const App = () => {
	const [selectedSort, setSelectedSort] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [todoText, setTodoText] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const { requestAddTodo, isCreating, handleClick } = useRequestAddTodo(
		todoText,
		setRefreshTodos,
		setTodoText,
	);
	const { todoList, isLoading, handleCheck } = useRequestGetTodoList();
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(setRefreshTodos);
	const { requestUpdateTodo } = useRequestUpdateTodo(setRefreshTodos, todoText);

	const sortTodos = () => {
		setSelectedSort(!selectedSort);
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const filteredTodos = todoList.filter((todo) =>
		todo.title.toLowerCase().includes(searchTerm),
	);

	const getSortedTodos = () => {
		if (selectedSort) {
			return [...todoList].sort((a, b) => a['title'].localeCompare(b['title']));
		} else if (searchTerm) {
			return filteredTodos;
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
							isActive={isCreating || isUpdating || isDeleting}
							onClick={sortTodos}
							label={'По созданию'}
						/>
					) : (
						<Button
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
