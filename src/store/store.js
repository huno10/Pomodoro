import { configureStore, createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: Date.now(),
                value: action.payload.value,
                complited: action.payload.complited,
                interval: action.payload.interval,
                timerRunning: false
            })
        },
        removeTodo: (state, action) => {
            const idToRemove = action.payload.id;
            return state.filter(todo => todo.id !== idToRemove);
        },
        increaseTimeInterval: (state, action) => {
            const { id, newInterval } = action.payload;

            return state.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        interval: newInterval,
                    };
                }
                return todo;
            });
        },

        toggleTimerRunning: (state, action) => {
            const { id, timerRunning } = action.payload;

            return state.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        timerRunning: timerRunning,
                    };
                }
                return todo;
            });
        },
        toggleСomplited: (state, action) => {
            const { id, complited } = action.payload;

            return state.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        complited: complited,
                    };
                }
                return todo;
            });
        },
    },
});

export const { addTodo } = tasksSlice.actions;
export const { removeTodo } = tasksSlice.actions
export const { increaseTimeInterval } = tasksSlice.actions
export const { toggleTimerRunning } = tasksSlice.actions
export const { toggleСomplited } = tasksSlice.actions

const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    },
});

export default store;