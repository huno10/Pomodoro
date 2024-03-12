import { useState, useEffect } from 'react';

export const useInterval = (interval, isRunning) => {
    const [seconds, setSeconds] = useState(interval);

    useEffect(() => {
        let timerId;

        if (isRunning && seconds > 0) {
            timerId = setInterval(() => {
                setSeconds((s) => s - 1);
            }, 50);
        }

        return () => {
            clearInterval(timerId);
        };
    }, [isRunning, seconds]);

    useEffect(() => {
        if (!isRunning) {
            setSeconds(interval);
        }
    }, [isRunning, interval]);

    const handleAddSecondsClick = () => {
        setSeconds((s) => s + 60);
    };

    return { seconds, handleAddSecondsClick };
};
