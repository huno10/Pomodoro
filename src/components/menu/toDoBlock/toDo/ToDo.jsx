import React, { useState } from 'react';
import styles from './ToDo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from '../../../../store/store';
import { ToDoItem } from './toDoItem/ToDoItem';

export const ToDo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

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

    const handleRemoveTask = (id) => {
        if (id) {
            dispatch(removeTodo({ id }));
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
                    <ToDoItem key={index} task={task} index={index} handleRemoveTask={handleRemoveTask} />
                ))}
            </ul>
        </div>
    );
};
