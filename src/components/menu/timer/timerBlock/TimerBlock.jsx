import React from 'react';
import styles from './TimerBlock.module.css';
import intervalSvg from '../../../../img/addInterval.svg';

const TimerBlock = (props) => {
    const {
        isTimerRunning,
        totalSeconds,
        handlePauseClick,
        handleAddMinuteClick,
        handleContinueClick,
        handleStopClick,
        handleDoneClick,
        handleStartClick,
        isTimerPaused,
        value,
        id,
        isPauseBlock,
        handleCancelClick,
        currentTomato
    } = props;

    const minutesString = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secondsString = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    const displayTime = totalSeconds ? `${minutesString}:${secondsString}` : '00:00';


    const textColor = isTimerRunning ? (isPauseBlock ? '#A8B64F' : '#DC3E22') : (isPauseBlock ? '#A8B64F' : '#333333');
    const backgroundColor = isTimerRunning ? (isPauseBlock ? '#A8B64F' : '#DC3E22') : (isTimerPaused ? (isPauseBlock ? '#A8B64F' : '#DC3E22') : (isPauseBlock ? '#A8B64F' : '#C4C4C4'));

    return (
        <>
            <div className={styles.toDo_header} style={{ backgroundColor }}>
                <h3 className={styles.title}>{value}</h3>
                <p className={styles.toDo_name}>{isPauseBlock ? `Пауза ${currentTomato}` : `Помидор ${currentTomato}`}</p>
            </div>
            <div className={styles.timer_block}>
                <div className={styles.timer}>
                    <p className={styles.interval} style={{ color: textColor }}>
                        {displayTime}
                    </p>
                    <button className={styles.add_interval_inc} onClick={() => handleAddMinuteClick()} >
                        <img src={intervalSvg} alt="" />
                    </button>
                </div>
                {/* <div>
                    <p className={styles.toDo_info}>
                        <span className={styles.toDo_span}>{`Задача ${index !== -1 ? index + 1 : ''} - `}</span>
                        {value}
                    </p>
                </div> */}
                <div className={styles.btn_wrapper}>
                    {isTimerRunning ? (
                        <>
                            <button className={styles.btn_start} onClick={handlePauseClick}>Пауза</button>
                            <button className={`${styles.btn_stop} ${styles.btn_active}`} onClick={handleStopClick}>Стоп</button>
                        </>
                    ) : (
                        isTimerPaused ? (
                            <>
                                <button className={styles.btn_start} onClick={handleContinueClick}>Продолжить</button>
                                {isPauseBlock ? (
                                    <button className={`${styles.btn_stop} ${styles.btn_active}`} onClick={handleCancelClick}>Пропустить</button>
                                ) : (
                                    <button className={`${styles.btn_stop} ${styles.btn_active}`} onClick={() => handleDoneClick(id)}>Сделано</button>
                                )}
                            </>
                        ) : (
                            <>
                                <button className={styles.btn_start} onClick={handleStartClick}>Старт</button>
                                <button className={styles.btn_stop} onClick={handleStopClick} disabled>Стоп</button>
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default TimerBlock;
