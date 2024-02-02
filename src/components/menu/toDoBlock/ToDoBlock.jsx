import React from 'react'
import styles from './ToDoBlock.module.css'
import { InfoBlock } from './infoBlock/InfoBlock'
import { ToDo } from './toDo/ToDo'

export const ToDoBlock = ({ setTaskId }) => {
    return (
        <div className={styles.container}>
            <InfoBlock />
            <ToDo setTaskId={setTaskId} />
        </div>
    )
}
