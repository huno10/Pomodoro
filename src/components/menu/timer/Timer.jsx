import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';
import intervalSvg from '../../../img/addInterval.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleIntervalIncr } from '../../../hooks/useHandleIntervalIncr';
import { useInterval } from '../../../hooks/useInterval';
import { increaseTimeInterval, toggleTimerRunning } from '../../../store/store';

export const Timer = ({ taskId }) => {
  const dispatch = useDispatch();

  const { id, index } = taskId;
  const [taskInfo, setTaskInfo] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentFormattedTime, setCurrentFormattedTime] = useState('');

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
    dispatch(toggleTimerRunning({ id, timerRunning: true }));
  };
  //Обработчик событий СТОП
  const handleStopClick = () => {
    setIsTimerRunning(false);
    dispatch(increaseTimeInterval({ id, newInterval: currentFormattedTime }));
    dispatch(toggleTimerRunning({ id, timerRunning: false }));
  };

  return (
    <div className={styles.container}>
      {taskInfo ? (
        <>
          <div className={styles.toDo_header}>
            <h3 className={styles.title}>{value}</h3>
            <p className={styles.toDo_name}>{`Помидор ${index !== -1 ? index + 1 : ''}`}</p>
          </div>
          <div className={styles.timer_block}>
            <div className={styles.timer}>
              <button className={styles.add_interval_dec} onClick={() => handleIntervalIncr(id, false)}>
                <span className={styles.btn_dec}></span>
              </button>
              <p className={styles.interval}>{formattedTime || interval}</p>
              <button className={styles.add_interval_inc} onClick={() => handleIntervalIncr(id, true)}>
                <img src={intervalSvg} alt="" />
              </button>
            </div>
            <div>
              <p className={styles.toDo_info}>
                <span className={styles.toDo_span}>{`Задача ${index !== -1 ? index + 1 : ''} - `}</span>
                {value}
              </p>
            </div>
            <div className={styles.btn_wrapper}>
              <button className={styles.btn_start} onClick={handleStartClick}>Старт</button>
              <button className={styles.btn_stop} onClick={handleStopClick}>Стоп</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.toDo_header}>
            <h3 className={styles.title}>{'Выберите задание'}</h3>
            <p className={styles.toDo_name}>{`Помидор`}</p>
          </div>
          <div className={styles.timer_block}>
            <div className={styles.timer}>
              <p className={styles.interval}>{'00:00'}</p>
              <button className={styles.add_interval_inc}>
                <img src={intervalSvg} alt="" />
              </button>
            </div>
            <div>
              <p className={styles.toDo_info}>
                <span className={styles.toDo_span}>{`Нет задания `}</span>
                {'- '}
              </p>
            </div>
            <div className={styles.btn_wrapper}>
              <button className={styles.btn_start}>Старт</button>
              <button className={styles.btn_stop}>Стоп</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
