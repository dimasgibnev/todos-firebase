import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDMRI8r8biO84SqN8sDNlHrA8nt-TELS9E',
	authDomain: 'todosproject-6486b.firebaseapp.com',
	projectId: 'todosproject-6486b',
	storageBucket: 'todosproject-6486b.appspot.com',
	messagingSenderId: '741542203621',
	appId: '1:741542203621:web:fd06d36f1366985faa840c',
	databaseURL:
		'https://todosproject-6486b-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
