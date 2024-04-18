import { useState } from 'react';
import { Button, InputForm, TodoItem } from '..';
import styles from './TodoList.module.css';


export const TodoList = ({
	todoList,
	handleCheck,
	isActive,
	RequestDeleteTodo,
	requestUpdateTodo,
	isUpdating,
	setTodoText,
	setIsUpdating,
	todoText
}) => {
	const [editingId, setEditingId] = useState(null);

	const handleUpdate = (id) => {
		setIsUpdating(false);
		return requestUpdateTodo(id);
	};

	return (
		<>
			{isUpdating && (
				<InputForm
				label={'Изменить'}
					setTodoText={setTodoText}
					handleSubmit={() => handleUpdate(editingId)}
					todoText={todoText}
				/>
			)}
			{todoList.map(({ id, title, completed }, index) => (
				<div className={styles['todo-container']} key={id}>
					<TodoItem
						id={id}
						title={title}
						completed={completed}
						index={index}
						handleCheck={handleCheck}
					/>
					<Button
						id={id}
						onClick={RequestDeleteTodo}
						isActive={isActive}
						name={'delete-btn'}
						label={'Удалить'}
					/>
					<Button
						id={id}
						onClick={() => {
							setIsUpdating(true);
							setEditingId(id);
						}}
						isActive={isActive}
						name={'update-btn'}
						label={'Изменить'}
					/>
				</div>
			))}
		</>
	);
};
