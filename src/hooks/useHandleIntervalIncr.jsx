import { useDispatch, useSelector } from "react-redux";
import { increaseTimeInterval } from "../store/store";

export const useHandleIntervalIncr = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    return (id, increment) => {
        const taskToUpdate = tasks.find(item => item.id === id);

        if (taskToUpdate) {
            const [minutes, seconds] = taskToUpdate.interval.split(':');
            let newMinutes = parseInt(minutes, 10);
            let newSeconds = parseInt(seconds, 10);

            if (increment) {
                newMinutes++;
            } else {
                newMinutes = Math.max(0, newMinutes - 1);
            }

            const newInterval = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
            dispatch(increaseTimeInterval({ newInterval, id }));
        }
    };
};