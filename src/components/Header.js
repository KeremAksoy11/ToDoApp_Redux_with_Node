import {useState} from 'react';
import { useDispatch} from 'react-redux'
import { addToDoAsync } from '../redux/todos/services'
import { useSelector } from 'react-redux';

function Header() {
	const [title, setTitle] = useState('');
	

	const dispatch = useDispatch();
	const İsLoading = useSelector((state)=> state.todos.addNewTodoLoading)
	const Error = useSelector((state)=> state.todos.addNewTodoError);

	const handleSubmit = async (e) =>{ 
	if (!title) return; 
	e.preventDefault();
	await dispatch(addToDoAsync({ title}))
	setTitle('');
	}

	if(Error)
	{
		alert(Error);
		return
	}

    return ( 
    <div>
        <header className="header">
		<h1>todos</h1>
		<form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center'}}>
			<input className="new-todo"
			disabled={İsLoading}
			placeholder="What needs to be done?"
			autoFocus 
			value={title} 
			onChange={(e) => setTitle(e.target.value)}/>
			{İsLoading && <span style={{paddingRight: 10}}>Loading...</span>}
		</form>
	</header>
    </div>);
}

export default Header;