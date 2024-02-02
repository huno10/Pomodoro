import React, { useState, useEffect } from 'react';
import styles from './ToDo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from '../../../../store/store';
import { ToDoItem } from './toDoItem/ToDoItem';
import { useHandleIntervalIncr } from '../../../../hooks/useHandleIntervalIncr';

export const ToDo = ({ setTaskId }) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const isAnyTimerRunning = tasks.some(task => task.timerRunning);

    const [value, setvalue] = useState('');
    const interval = '25:00';

    const handleInputChange = (event) => {
        setvalue(event.target.value);
    };

    const handleAddTask = () => {
        if (value.trim() !== '') {
            dispatch(addTodo({ value, interval, isTimerRunning: false }));
            setvalue('');
        }
    };

    const handleRemoveTask = (id) => {
        if (id) {
            dispatch(removeTodo({ id }));
        }
    };

    const handleIntervalIncr = useHandleIntervalIncr();

    const handleClickTaskItem = (id, index) => {
        if (!isAnyTimerRunning) {
            setTaskId({ id, index });
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
            <ul>
                {tasks.map((task, index) => (
                    <ToDoItem key={index}
                        handleClickTaskItem={() => handleClickTaskItem(task.id, index)}
                        task={task} index={index}
                        handleRemoveTask={handleRemoveTask}
                        handleIncreaseTimeInterval={handleIntervalIncr}
                    />
                ))}
            </ul>
        </div>
    );
};
