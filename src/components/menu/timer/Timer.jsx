import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleIntervalIncr } from '../../../hooks/useHandleIntervalIncr';
import { useInterval } from '../../../hooks/useInterval';
import { addStatistic, increaseTimeInterval, removeTodo, toggleTimerRunning } from '../../../store/store';
import TimerBlock from './timerBlock/TimerBlock';

const FormatTimer = (start, stop) => {
  const [startMin, startSec] = start.split(':').map(Number);
  const [stopMin, stopSec] = stop.split(':').map(Number);

  const totalSeconds = (startMin * 60 + startSec) - (stopMin * 60 + stopSec);

  // const hours = Math.floor(totalSeconds / 3600);
  // const minutes = Math.floor((totalSeconds % 3600) / 60);
  // const seconds = totalSeconds % 60;

  // const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (totalSeconds);
}



export const Timer = ({ taskId: { id, index } }) => {
  const dispatch = useDispatch();

  const task = useSelector((state) => {
    const foundTask = state.tasks.find((item) => item.id === id);
    return foundTask || null;
  });

  const [stopTimer, setStopTimer] = useState('');
  const [taskInfo, setTaskInfo] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleIntervalIncr = useHandleIntervalIncr();

  useEffect(() => {
    setTaskInfo(task ? true : false);
  }, [task]);

  const { value, interval } = task || {};

  const formattedTime = useInterval(interval, isTimerRunning);

  useEffect(() => {
    setStopTimer(formattedTime);
  }, [formattedTime]);


  //Обработчик событий СТАРТ
  const handleStartClick = () => {
    setIsTimerRunning(true);
    setIsPaused(true)
    dispatch(toggleTimerRunning({ id, timerRunning: true }));
  };
  //Обработчик событий СТОП
  const handleStopClick = () => {
    setIsTimerRunning(false);
    setIsPaused(false)
    dispatch(increaseTimeInterval({ id, newInterval: stopTimer }));
    dispatch(toggleTimerRunning({ id, timerRunning: false }));
  };
  //Обработчик событий на ПАУЗА
  const handlePauseClick = () => {
    setIsTimerRunning(false);
    setIsPaused(true)
  }
  //Обработчик событий на ПРОДОЛЖИТЬ
  const handleContinueClick = () => {
    setIsTimerRunning(true);
    setIsPaused(true)
  }





  // const pauseStat = 10
  const stopsStat = '10 минут'
  const focusStat = '10%'
  const startInterval = interval
  const stopInterval = stopTimer

  //Обработчик событий на СДЕЛАНО
  const handleDoneClick = (id) => {
    const workTime = FormatTimer(interval, stopTimer)
    setIsPaused(false)
    dispatch(addStatistic({ workTime, stopsStat, focusStat, startInterval, stopInterval }))
    dispatch(removeTodo({ id }))

  }

  return (
    <div className={styles.container}>
      {taskInfo ? (
        <TimerBlock
          isTimerRunning={isTimerRunning}
          formattedTime={formattedTime}
          handleIntervalIncr={handleIntervalIncr}
          handlePauseClick={handlePauseClick}
          handleContinueClick={handleContinueClick}
          handleStopClick={handleStopClick}
          handleDoneClick={handleDoneClick}
          handleStartClick={handleStartClick}
          isPaused={isPaused}
          value={value}
          index={index}
          interval={interval}
          id={id}
        />
      ) : (
        <TimerBlock
          value={'Выберите задание'}
          index={-1}
          interval={'00:00'} />
      )
      }
    </div >
  );
};
