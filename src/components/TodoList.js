import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../redux/todos/todosSlice'
import {destroy} from '../redux/todos/todosSlice'
import { selectFilteredTodos} from '../redux/todos/todosSlice'
import { getTodosAsync} from '../redux/todos/todosSlice'
import Loading from './Loading';
import Error from './Error';


function TodoList() {
   
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const İsLoading = useSelector(state => state.todos.İsLoading);
    const error = useSelector(state => state.todos.error);

    useEffect(()  => {
        dispatch(getTodosAsync())
    }, [dispatch]);

    const handleDestroy = (id)=>
    {
        if(window.confirm('Are you sure you want to delete?'))
        {
        dispatch(destroy(id))
        }
        
    }

    if (İsLoading)
    {
        
        return <Loading/>
       
    }

    if (error)
    {
        return <Error message={error}/>
    }


    return (
        <ul className="todo-list">
        <li>
            {
                filteredTodos.map((item)=>(
                    <li key={item.id} className={item.completed ? 'completed' : ''}> {/* Bu classname ise eğer compeleted'teki veri true ise completed classını çalıştır değilse bir şey yapma dedik.*/}
                    
                    <div className="view">
                        <input className="toggle" 
                        type="checkbox"
                        checked={item.completed} 
                        onChange={() =>dispatch(toggle({id :item.id}))}/>
                        <label>{item.title}</label>
                        <button className="destroy" onClick={()=>handleDestroy(item.id)}></button>
                    </div>
                </li>
                ))
            }
         
        </li>
    </ul>
      );
}

export default TodoList;