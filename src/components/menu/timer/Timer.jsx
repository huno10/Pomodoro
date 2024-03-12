import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import TimerBlock from './timerBlock/TimerBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from '../../../hooks/useInterval';
import { addStats, removeTodo, updateTodo } from '../../../store/store';
import { getWeekAndDay, pauseTimer } from '../../../utils/formatTimer';

const getDateInfo = (currentDate) => {
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
  };

  const dayOfWeek = currentDate.getDay();
  // const dayOfMonth = currentDate.getDate();
  const weekNumber = getWeekNumber(currentDate);

  return {
    dayOfWeek,
    weekNumber,
  };
};

export const Timer = ({ taskId }) => {

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);

  const [taskInfo, setTaskInfo] = useState(false);
  const [currentTomato, setCurrentTomato] = useState(1);
  const { value, tomato, id } = taskInfo || {};

  useEffect(() => {
    if (tasks.length === 0 || currentTomato > tasks.reduce((maxTomato, task) => Math.max(maxTomato, task.tomato), 0)) {
      setTaskInfo(false);
    } else {
      const defaultTask = tasks[0];
      if (currentTomato > defaultTask.tomato) {
        setTaskInfo(defaultTask);
        setCurrentTomato(1);
      } else {
        const selectedTask = taskId ? tasks.find((item) => item.id === taskId) || defaultTask : defaultTask;
        setTaskInfo(selectedTask);
      }
    }
  }, [tasks, taskId, currentTomato]);

  let startInterval = 1500

  const [totalTomato, setTotalTomato] = useState(0);
  let pauseInterval = totalTomato % 4 === 0 ? 1800 : 300

  const [isPauseBlock, setIsPauseBlock] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(null);

  useEffect(() => {
    setTimerTime(isPauseBlock ? pauseInterval : startInterval);
  }, [isPauseBlock, startInterval, pauseInterval]);

  const { seconds, handleAddSecondsClick } = useInterval(timerTime, isTimerRunning);

  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [startTimerPause, setStartTimerPause] = useState(null);

  const [pause, setPause] = useState(0);
  const [stopCliced, setStopCliced] = useState(0);




  const currentDate = new Date()
  let timerWorked = 0
  let timerPaused = 0

  //СТАРТ
  const handleStartClick = () => {
    setIsTimerRunning(true);
    dispatch(updateTodo({ id, updates: { timerRunning: true, } }));
  };

  //СТОП
  const handleStopClick = () => {
    setStopCliced(prev => prev + 1)
    setIsTimerRunning(false);
    setIsTimerPaused(false)
    dispatch(updateTodo({ id, updates: { timerRunning: false, } }));
  };

  //ПАУЗА
  const handlePauseClick = () => {
    setTimerTime(seconds)
    setStartTimerPause(new Date);
    setIsTimerRunning(false);
    setIsTimerPaused(true)
  }

  //ПРОДОЛЖИТЬ
  const handleContinueClick = () => {
    setPause(pauseTimer(startTimerPause, new Date))
    setIsTimerRunning(true);
    setIsTimerPaused(true)
  }

  //ПРОПУСТИТЬ
  const handleCancelClick = () => {
    if (currentTomato >= tomato) {
      dispatch(removeTodo({ id }))
      setCurrentTomato(1)
    } else {
      dispatch(updateTodo({ id, updates: { timerRunning: true, } }));
      setCurrentTomato(currentTomato + 1);
    }
    setIsPauseBlock(false)
    dispatch(updateTodo({ id, updates: { timerRunning: false, } }));
    setIsTimerPaused(false)
    timerPaused = pauseInterval - seconds
  }

  //СДЕЛАНО
  const handleDoneClick = (id) => {
    const timePause = pauseTimer(startTimerPause, new Date)
    timerWorked = startInterval - seconds
    const pauseTime = pause + timePause
    const { week, dayOfWeek } = getWeekAndDay(new Date)
    setTotalTomato(prev => prev + 1)
    setIsTimerRunning(false);
    setStopCliced(0)
    setIsPauseBlock(true)
    setIsTimerPaused(false)
    dispatch(addStats({
      stops: stopCliced,
      week: week,
      dayOfWeek: dayOfWeek,
      workTime: timerWorked,
      pauseTime: pauseTime,
      tomato: 1
    }))
  }

  return (
    <div className={styles.container}>
      {taskInfo && (
        <TimerBlock
          isTimerRunning={isTimerRunning}
          totalSeconds={seconds}
          isPauseBlock={isPauseBlock}
          handleAddMinuteClick={handleAddSecondsClick}
          handlePauseClick={handlePauseClick}
          handleContinueClick={handleContinueClick}
          handleStopClick={handleStopClick}
          handleDoneClick={handleDoneClick}
          handleStartClick={handleStartClick}
          handleCancelClick={handleCancelClick}
          isTimerPaused={isTimerPaused}
          currentTomato={currentTomato}
          value={value}
          id={id}
        />
      )
      }
    </div >
  );
};
