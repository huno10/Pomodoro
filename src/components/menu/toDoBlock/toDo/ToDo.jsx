import React, { useState } from 'react'
import styles from './ToDo.module.css'
import { ToDoItem } from './toDoItem/ToDoItem';

export const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
    };

    return (
        <div>
            <div className={styles.input_block}>
                <input className={styles.input}
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Название задачи"
                />
                <button className={styles.btn_add} onClick={handleAddTask}>Добавить</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <ToDoItem key={index} task={task} index={index}/>
                ))}
            </ul>
        </div>
    );
}
