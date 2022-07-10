import React from 'react';
import TodoList from './TodoList';


function Main() {
    return (
        <div>
            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <label for="toggle-all">
                    Mark all as complete
                </label>
                <TodoList/>
                
            </section>
        </div>
    );
}

export default Main;