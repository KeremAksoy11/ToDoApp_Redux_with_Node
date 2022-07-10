import {createSlice} from '@reduxjs/toolkit'

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
        ]
    },
    reducers :{}
});

export default todosSlice.reducer;