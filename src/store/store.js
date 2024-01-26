import { configureStore, createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            return [...state, action.payload];
        },
    },
});

export const { addTask } = tasksSlice.actions;

const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    },
});

export default store;