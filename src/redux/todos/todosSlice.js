import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
});


export const addToDoAsync = createAsyncThunk('todos/addToDoAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data)
    return res.data;
})

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

        toggle: (state, action) => {
            const { id } = action.payload;

            const item = state.items.find(item => item.id === id)
            item.completed = !item.completed
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered;
        },
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

export const { toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;