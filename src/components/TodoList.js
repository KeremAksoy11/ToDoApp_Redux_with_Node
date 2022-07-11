import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../redux/todos/todosSlice'
import {destroy} from '../redux/todos/todosSlice'

let filtered;

function TodoList() {
    const items = useSelector(state=> state.todos.items)
    const activeFilter = useSelector(state=> state.todos.activeFilter)
    const dispatch = useDispatch();

    const handleDestroy = (id)=>
    {
        if(window.confirm('Are you sure you want to delete?'))
        {
        dispatch(destroy(id))
        }
        
    }

    filtered = items;
    if(activeFilter !== 'all')
    {
        filtered = items.filter((todo)=> activeFilter === 'active' 
        ? todo.completed === false
        : todo.completed === true
        )
    }

    return (
        <ul className="todo-list">
        <li>
            {
                filtered.map((item)=>(
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