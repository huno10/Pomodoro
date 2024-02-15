import { configureStore, createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: Date.now(),
                value: action.payload.value,
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
    },
});

// const statisticSlice = createSlice({
//     name: 'statistics',
//     initialState: [],
//     reducers: {
//         addStatistic: (state, action) => {
//             state.push({
//                 id: action.payload.id,
//                 pause: action.payload.pauseStat,
//                 stops: action.payload.stopsStat,
//                 focus: action.payload.focusStat,
//                 startInterval: action.payload.startInterval,
//                 stopInterval: action.payload.stopInterval,
//             })
//         },
//     }
// })

const statisticSlice = createSlice({
    name: 'statistics',
    initialState: {
        workTime: 0,
        //   stops: 0,
        //   focus: 0,
        startInterval: 0,
        stopInterval: 0,
    },
    reducers: {
        addStatistic: (state, action) => {
            const { workTime, stopsStat, focusStat, startInterval, stopInterval } = action.payload;

            state.workTime += workTime;
            state.stops += stopsStat;
            state.focus += focusStat;
            state.startInterval = startInterval;
            state.stopInterval = stopInterval;
        },
    },
});

export const { addTodo } = tasksSlice.actions;
export const { removeTodo } = tasksSlice.actions
export const { increaseTimeInterval } = tasksSlice.actions
export const { toggleTimerRunning } = tasksSlice.actions

export const { addStatistic } = statisticSlice.actions


const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        stats: statisticSlice.reducer,
    },
});

export default store;