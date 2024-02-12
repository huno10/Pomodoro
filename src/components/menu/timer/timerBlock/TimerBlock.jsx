import React from 'react';
import styles from './TimerBlock.module.css';
import intervalSvg from '../../../../img/addInterval.svg';

const TimerBlock = ({ isTimerRunning, formattedTime, handleIntervalIncr, handlePauseClick, handleContinueClick, handleStopClick, handleDoneClick, handleStartClick, isPaused, value, index, id, interval }) => {
    return (
        <>
            <div className={styles.toDo_header} style={{
                backgroundColor: isTimerRunning && formattedTime >= '05:00' ? '#DC3E22' : (isTimerRunning ? '#A8B64F' : '#C4C4C4')
            }}>
                <h3 className={styles.title}>{value}</h3>
                <p className={styles.toDo_name}>{`Помидор ${index !== -1 ? index + 1 : ''}`}</p>
            </div>
            <div className={styles.timer_block}>
                <div className={styles.timer}>
                    <button className={styles.add_interval_dec} onClick={() => handleIntervalIncr(id, false)}>
                        <span className={styles.btn_dec}></span>
                    </button>
                    <p className={styles.interval} style={{
                        color: isTimerRunning && formattedTime >= '05:00' ? '#DC3E22' : (isTimerRunning ? '#A8B64F' : '#333333')
                    }}>
                        {formattedTime || interval}
                    </p>
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
                    {isTimerRunning ? (
                        <>
                            <button className={styles.btn_start} onClick={handlePauseClick}>Пауза</button>
                            <button className={`${styles.btn_stop} ${styles.btn_active}`} onClick={handleStopClick}>Стоп</button>
                        </>
                    ) : (
                        isPaused ? (
                            <>
                                <button className={styles.btn_start} onClick={handleContinueClick}>Продолжить</button>
                                {formattedTime <= '05:00' ? (
                                    <button className={`${styles.btn_stop} ${styles.btn_active}`} onClick={handleStopClick}>Пропустить</button>
                                ) : (
                                    <button className={`${styles.btn_stop} ${styles.btn_active}`} onClick={() => handleDoneClick(id)}>Сделано</button>
                                )}
                            </>
                        ) : (
                            <>
                                <button className={styles.btn_start} onClick={handleStartClick}>Старт</button>
                                <button className={styles.btn_stop} onClick={handleStopClick}>Стоп</button>
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default TimerBlock;
