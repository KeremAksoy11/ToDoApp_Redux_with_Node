import {useState} from 'react';
import { useDispatch} from 'react-redux'

import { addToDo } from '../redux/todos/todosSlice';


function Header() {
	const [title, setTitle] = useState('');
	

	const dispatch = useDispatch();

	const handleSubmit = (e) =>{ // bir istek gönderdiğimizde sayfayı yönlendirmemek için kullanıyoruz. Handlesubmit'in amacı budur.
	if (!title) return; // eğer title içi boşşa direkt dön dedik ve veri girişini engelledik.
	e.preventDefault();
	dispatch(addToDo({ title}))
	setTitle('');
	}

    return ( 
    <div>
        <header className="header">
		<h1>todos</h1>
		<form onSubmit={handleSubmit}>
			<input className="new-todo"
			placeholder="What needs to be done?"
			autoFocus 
			value={title} 
			onChange={(e) => setTitle(e.target.value)}/>
		</form>
	</header>
    </div>);
}

export default Header;