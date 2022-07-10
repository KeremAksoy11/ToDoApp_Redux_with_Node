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
    reducers :{
        addToDo : (state,action) =>{
            state.items.push(action.payload)
        }
    }
});

/* Global Stateimizin items kısmına push metodu ile dizinin sonuna yeni değerler eklemek için kullanılır. İşlem sonucunda ise, dizinin yeni uzunluğunu geriye döner. */ 
/* Action. payload kısmı ise componentsde duran input formundan gelecektir. */

export const {addToDo} = todosSlice.actions;

export default todosSlice.reducer;