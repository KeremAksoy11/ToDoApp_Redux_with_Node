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

export const toggleToDoAsync = createAsyncThunk('todos/toggleToDoAsync', async ({id, data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data)
    return res.data;
});

export const removeItemAsync = createAsyncThunk('todos/removeItemAsync', async (id) => {  
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}` )
    return id;
});

export const compeletedItemAsync = createAsyncThunk('todos/completedItemAsync', async (id,data) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data)
    return res.data;
});