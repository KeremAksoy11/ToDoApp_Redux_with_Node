import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {changeActiveFilter} from '../redux/todos/todosSlice'
import {selectTodos} from '../redux/todos/todosSlice'
import { compeletedItemAsync} from '../redux/todos/services'
import { getTodosAsync} from '../redux/todos/services'


function Footer() {

	const items = useSelector(selectTodos);
	const activeFilter = useSelector((state)=>	state.todos.activeFilter);
	const itemsLeft = items.filter(item=>!item.completed).length;
	const dispatch = useDispatch();
	
	
	const compeletedItem = async (id,completed) => {
		await dispatch(compeletedItemAsync({id,data : {completed}}))
	}

	useEffect(()  => {
        dispatch(getTodosAsync())
    }, [dispatch]);
	
	console.log(items)
    return ( <div>
        <footer className="footer">
		<span className="todo-count">
			<strong>{itemsLeft} </strong> item{itemsLeft > 1 && 's ' } left
		</span>

		<ul className="filters">
			<li>
				<a href="#/" 
				className={activeFilter === 'all' ? 'selected' : ''} 
				onClick={()=> dispatch(changeActiveFilter('all'))}>All</a>
			</li>
			<li>
				<a href="#/"  
				className={activeFilter === 'active' ? 'selected' : ''}
				onClick={()=> dispatch(changeActiveFilter('active'))} >
					Active
				</a>
			</li>
			<li>
				<a href="#/"  
				className={activeFilter === 'completed' ? 'selected' : ''}
				onClick={()=> dispatch(changeActiveFilter('completed'))}>
					Completed
				</a>
			</li>
		</ul>

		<button className="clear-completed" onClick={() => compeletedItem(items.id)}>
			Clear completed
		</button>
	</footer>
    </div> 
    );
}

export default Footer;