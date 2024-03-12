import React, { useState, useEffect } from 'react';
import styles from './ToDo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../../../../store/store';
import { ToDoItem } from './toDoItem/ToDoItem';
import { formatOfHoursAndMinutes, formatTime } from '../../../../utils/formatTimer';

export const ToDo = ({ setTaskId }) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const isAnyTimerRunning = tasks.some(task => task.timerRunning);

    const [hours, minutes, seconds] = formatOfHoursAndMinutes(tasks.reduce((acc, time) => { return acc + time.totalTime }, 0))
    const totalTime = formatTime(hours, minutes, seconds)

    const [isOpenDeleted, setIsOpenDeleted] = useState(false);

    const [value, setvalue] = useState('');

    const handleInputChange = (event) => {
        setvalue(event.target.value);
    };

    const handleAddTask = () => {
        if (value.trim() !== '') {
            dispatch(addTodo({ value }));
            setvalue('');
        }
    };

    const handleRemoveTask = () => {
        setIsOpenDeleted(true)
    };

    const handleClickTaskItem = (id) => {
        if (!isAnyTimerRunning) {
            setTaskId(id);
        }
    };

    return (
        <div>
            <div className={styles.input_block}>
                <input
                    className={styles.input}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Название задачи"
                />
                <button className={styles.btn_add} onClick={handleAddTask}>
                    Добавить
                </button>
            </div>
            <ul className={styles.list}>
                {tasks.map((task, index) => (
                    <ToDoItem key={index}
                        handleClickTaskItem={() => handleClickTaskItem(task.id)}
                        task={task}
                        id={task.id}
                        handleRemoveTask={handleRemoveTask}
                        isOpenDeleted={isOpenDeleted}
                        setIsOpenDeleted={setIsOpenDeleted}
                    />
                ))}
            </ul>

            <div className={styles.total_time}>{tasks.length  > 0 ? totalTime : ''}</div>

        </div>
    );
};
