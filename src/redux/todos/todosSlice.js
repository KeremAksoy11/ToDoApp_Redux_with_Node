import { createSlice } from '@reduxjs/toolkit'
import { getTodosAsync, addToDoAsync, removeItemAsync , toggleToDoAsync } from './services';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        İsLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodoLoading: false,
        addNewTodoError : null
    },
    reducers: {
        // Because I used API request
      /*   toggle: (state, action) => {
            const { id } = action.payload;

            const item = state.items.find(item => item.id === id)
            item.completed = !item.completed
        }, */
        /* destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered;
        }, */
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false)
            state.items = filtered
        }
        // add todo



    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            state.İsLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.İsLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.İsLoading = false;
            state.error = action.error.message;
        },
        // addToDo
        [addToDoAsync.pending]: (state, action) => {
            state.addNewTodoLoading = true
        },
        [addToDoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.addNewTodoLoading = false
        },
        [addToDoAsync.rejected]: (state, action) => {
            state.addNewTodoError = false;
            state.error = action.error.message;
        },
        // Toggle ToDo
        [toggleToDoAsync.fulfilled]: (state, action) => { 
         const {id, completed} = action.payload;
         const index = state.items.findIndex(item => item.id === id);
         state.items[index].completed = completed;
        },
        // Remove ToDo
        [removeItemAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered;
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

export const {   changeActiveFilter, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;