import React from 'react';
import {useSelector} from 'react-redux';



function TodoList() {
    const items = useSelector(state=> state.todos.items)
   

    return (
        <ul className="todo-list">
        {/* <li className="completed">
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Learn JavaScript</label>
                <button className="destroy"></button>
            </div>
        </li> */}
      
        <li>
            {
                items.map((item)=>(
                    <li key={item.id} className={item.completed ? 'completed' : ''}> {/* Bu classname ise eğer compeleted'teki veri true ise completed classını çalıştır değilse bir şey yapma dedik.*/}
                    
                    <div className="view">
                        <input className="toggle" type="checkbox" />
                        <label>{item.title}</label>
                        <button className="destroy"></button>
                    </div>
                </li>
                ))
            }
         
        </li>
    </ul>
      );
}

export default TodoList;