import React, { useState } from 'react'
import styles from './Menu.module.css'
import { ToDoBlock } from './toDoBlock/ToDoBlock'
import { Timer } from './timer/Timer'

// usf

export const Menu = () => {
    const [taskId, setTaskId] = useState('');

    return (
        <menu className={styles.menu}>
            <div className={styles.container}>
                <ToDoBlock setTaskId={setTaskId}/>
                <Timer taskId={taskId}/>
            </div>
        </menu>
    )
}
