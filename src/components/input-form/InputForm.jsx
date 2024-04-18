import { Button } from '..';
import styles from './InputForm.module.css';

export const InputForm = ({ handleSubmit, todoText, setTodoText, id, label }) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(id);
			}}
			className={styles.form}
		>
			<input
				type="text"
				value={todoText}
				onChange={(e) => setTodoText(e.target.value.trim())}
			/>
			<Button onClick={() => {}} type={'submit'} name={'add-todo'} label={label} />
		</form>
	);
};
