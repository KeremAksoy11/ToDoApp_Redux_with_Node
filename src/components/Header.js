import {useState} from 'react';
import { useDispatch} from 'react-redux'
import { nanoid } from 'nanoid'
import { addToDo } from '../redux/todos/todosSlice';


function Header() {
	const [title, setTitle] = useState('');
	

	const dispatch = useDispatch();

	const handleSubmit = (e) =>{ // bir istek gönderdiğimizde sayfayı yönlendirmemek için kullanıyoruz. Handlesubmit'in amacı budur.
	e.preventDefault();
	dispatch(addToDo({id:  nanoid() , title, completed : false}))
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