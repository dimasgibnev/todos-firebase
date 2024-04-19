import { useState } from 'react';
import { Button } from '..';
import styles from './InputForm.module.css';

export const InputForm = ({ handleSubmit, todoText, setTodoText, id, label }) => {
	const [isCreating, setIsCreating] = useState(false);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(id);
				setTodoText('');
				setIsCreating(!isCreating);
			}}
			className={styles.form}
		>
			<input
				type="text"
				value={todoText}
				onChange={(e) => setTodoText(e.target.value.trim())}
			/>
			<Button
				isActive={isCreating}
				onClick={() => {}}
				type={'submit'}
				name={'add-todo'}
				label={label}
			/>
		</form>
	);
};
