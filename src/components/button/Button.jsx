import styles from './Button.module.css';

export const Button = ({ name, label, isActive, onClick, id, type }) => {
	return (
		<button
			type={type}
			onClick={() => onClick(id)}
			disabled={isActive}
			className={`${styles.btn} ${styles[name]}`}
		>
			{label}
		</button>
	);
};
