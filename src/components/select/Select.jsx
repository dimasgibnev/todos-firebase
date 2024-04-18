import React from 'react';
import styles from './Select.module.css';
export const Select = ({ onChange, value }) => {
	return (
		<select
			value={value}
			onChange={(event) => onChange(event.target.value)}
			className={styles.select}
		>
			<option disabled>Сортировка</option>
			<option value="title">По алфавиту</option>
		</select>
	);
};
