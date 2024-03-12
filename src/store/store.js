import { configureStore, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const startInterval = 1500;
const tomato = 1;

const tasksSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => [
      ...state,
      {
        id: uuidv4(),
        value: action.payload.value,
        timerRunning: false,
        tomato: tomato,
        totalTime: startInterval * tomato
      },
    ],
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const todo = state.find(todo => todo.id === id);

      if (todo) {
        Object.keys(updates).forEach(key => {
          todo[key] = updates[key];
        });
        if (updates.tomato) {
          todo.totalTime = startInterval * updates.tomato;
        }
      }
    },
    removeTodo: (state, action) => {
      const idToRemove = action.payload.id;
      return state.filter(todo => todo.id !== idToRemove);
    },
  },
});

const statisticSlice = createSlice({
  name: 'stats',
  initialState: [],
  reducers: {
    addStats: (state, action) => {
      const { week, dayOfWeek, workTime, pauseTime, stops, tomato } = action.payload;

      const index = state.findIndex(stat =>
        stat.week === week && stat.dayOfWeek === dayOfWeek
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          workTime: state[index].workTime + (workTime || 0),
          pauseTime: state[index].pauseTime + (pauseTime || 0),
          stops: state[index].stops + (stops || 0),
          tomato: state[index].tomato + (tomato || 0),
        };
      } else {
        state.push({
          week: week,
          dayOfWeek: dayOfWeek,
          workTime: workTime || 0,
          pauseTime: pauseTime || 0,
          stops: stops || 0,
          tomato: tomato || 0
        });
      }
    },
    updateStats: (state, action) => {
      const { id, updates } = action.payload;
      const todo = state.find(todo => todo.id === id);

      if (todo) {
        Object.keys(updates).forEach(key => {
          if (key === 'workTime' || key === 'pauseTime' || key === 'stops' || key === 'completedTomato') {
            todo[key] += updates[key];
          } else {
            todo[key] = updates[key];
          }
        });
      }
    },
  }
})

export const { addTodo } = tasksSlice.actions;
export const { removeTodo } = tasksSlice.actions
export const { updateTodo } = tasksSlice.actions

export const { addStats } = statisticSlice.actions;
export const { updateStats } = statisticSlice.actions;

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    stats: statisticSlice.reducer
  },
});

export default store;
