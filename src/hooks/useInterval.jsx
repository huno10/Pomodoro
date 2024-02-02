import React, { useState, useEffect } from 'react';

export const useInterval = (interval, TimerRunning) => {
    const [time, setTime] = useState(null);

    useEffect(() => {
        if (!interval || typeof interval !== 'string') {
            return;
        }

        const [minutesStr, secondsStr] = interval.split(':');

        const minutes = parseInt(minutesStr, 10);
        const seconds = parseInt(secondsStr, 10);

        if (!isNaN(minutes) && !isNaN(seconds)) {
            const initialTime = minutes * 60 + seconds;
            setTime(initialTime);
        }
    }, [interval]);

    useEffect(() => {
        let timerInterval;

        if (TimerRunning && time > 0) {
            timerInterval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            console.log('Таймер завершен!');
        }

        return () => clearInterval(timerInterval);
    }, [TimerRunning, time]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return formattedTime;
};
