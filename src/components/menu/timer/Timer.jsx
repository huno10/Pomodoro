import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import intervalSvg from '../../../img/addInterval.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleIntervalIncr } from '../../../hooks/useHandleIntervalIncr';
import { useInterval } from '../../../hooks/useInterval';
import { increaseTimeInterval, removeTodo, toggleTimerRunning, toggleСomplited } from '../../../store/store';
import TimerBlock from './timerBlock/TimerBlock';

export const Timer = ({ taskId: { id, index } }) => {
  const dispatch = useDispatch();

  const [currentFormattedTime, setCurrentFormattedTime] = useState('');
  const [taskInfo, setTaskInfo] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplited, setIsComplited] = useState(0);

  const task = useSelector((state) => {
    const foundTask = state.tasks.find((item) => item.id === id);
    return foundTask || null;
  });

  const handleIntervalIncr = useHandleIntervalIncr();

  useEffect(() => {
    setTaskInfo(task ? true : false);
  }, [task]);

  const { value, interval } = task || {};

  const formattedTime = useInterval(interval, isTimerRunning);

  useEffect(() => {
    setCurrentFormattedTime(formattedTime);
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
    dispatch(increaseTimeInterval({ id, newInterval: currentFormattedTime }));
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
  //Обработчик событий на СДЕЛАНО
  const handleDoneClick = (id) => {
    dispatch(increaseTimeInterval({ id, newInterval: currentFormattedTime }));
    dispatch(toggleTimerRunning({ id, timerRunning: false }));
    dispatch(toggleСomplited({ id, complited: true }))
    dispatch(removeTodo({ id }))
    setIsComplited((prev) => prev + 1)
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
          value={value || 'Выберите задание'}
          index={index !== -1 ? index + 1 : ''}
          interval={interval || '00:00'}
          id={id}
        />
      ) : (
        <TimerBlock
          value={'Выберите задание'}
          index={''}
          interval={'00:00'} />
      )
      }
    </div >
  );
};
