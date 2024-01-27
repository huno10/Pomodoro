import { configureStore, createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: Date.now(),
                value: action.payload.value,
                complited: false,
                interval: '25:00'
            })
        },
        removeTodo: (state, action) => {
            const idToRemove = action.payload.id;
            return state.filter(todo => todo.id !== idToRemove);
        },
    },
});

export const { addTodo } = tasksSlice.actions;
export const { removeTodo } = tasksSlice.actions

const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    },
});

export default store;