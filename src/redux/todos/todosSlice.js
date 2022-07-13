import {createSlice} from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'


export const todosSlice = createSlice({
    name : 'todos',
    initialState : {
        items : [
            {
                id : '1',
                title : 'Learn React',
                completed : false,
            },
            {
                id : '2',
                title : 'Learn React Native',
                completed : true,
            }
        ],
        activeFilter : 'all',
    },
    reducers :{
        addToDo : {
        reducer :(state,action) =>{
            state.items.push(action.payload)
        },
        prepare : ({title}) => { // Sürekli aynı verileri statik olarak yazacaksak ve reducerı çok yerde kullanacaksak, koddan kar etmek için reducer'a gelen action.payloadını burada manipüle ederek kısa kod satırlarıyla bitirebiliriz işi.
            return {
                payload : {
                    id : nanoid(),
                    completed : false,
                    title,
                }
            }
        }

        },
        toggle : (state,action) =>{
            const {id} = action.payload;

            const item = state.items.find(item => item.id === id)
            item.completed = !item.completed
        },
        destroy : (state,action) =>{
            const id = action.payload;
            const filtered = state.items.filter((item)=> item.id !== id)
            state.items = filtered;
        },
        changeActiveFilter : (state,action) =>{
            state.activeFilter = action.payload;
        },
        clearCompleted : (state) =>{
            const filtered = state.items.filter(item => item.completed === false)
            state.items = filtered
        }


    }
});

/* Global Stateimizin items kısmına push metodu ile dizinin sonuna yeni değerler eklemek için kullanılır. İşlem sonucunda ise, dizinin yeni uzunluğunu geriye döner. */ 
/* Action. payload kısmı ise componentsde duran input formundan gelecektir. */

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items;
    } // eğer todos all ise bütün global stateyi dön.
    return state.todos.items.filter((todo) =>
    state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true)
};

export const {addToDo, toggle, destroy, changeActiveFilter, clearCompleted} = todosSlice.actions;

export default todosSlice.reducer;