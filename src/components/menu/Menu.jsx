import React from 'react'
import styles from './Menu.module.css'
import { ToDoBlock } from './toDoBlock/ToDoBlock'
import { Timer } from './timer/Timer'

export const Menu = () => {
    return (
        <menu className={styles.menu}>
            <div className={styles.container}>
                <ToDoBlock />
                <Timer />
            </div>
        </menu>
    )
}
