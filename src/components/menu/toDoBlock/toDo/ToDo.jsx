import React, { useState } from 'react';
import styles from './ToDo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../../store/store';
import { ToDoItem } from './toDoItem/ToDoItem';

export const ToDo = () => {
    const dispatch = useDispatch();
    
    const tasks = useSelector((state) => state.tasks);
    const [newTask, setNewTask] = useState('');

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            dispatch(addTask({ value: newTask, time: '25:00' }));
            setNewTask('');
        }
    };

    return (
        <div>
            <div className={styles.input_block}>
                <input
                    className={styles.input}
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Название задачи"
                />
                <button className={styles.btn_add} onClick={handleAddTask}>
                    Добавить
                </button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <ToDoItem key={index} task={task.value} index={index} />
                ))}
            </ul>
        </div>
    );
};
