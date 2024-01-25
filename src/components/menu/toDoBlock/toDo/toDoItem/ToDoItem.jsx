import React from 'react'
import styles from './ToDoItem.module.css'
import btnItem from '../../../../../img/btn-item.svg'

export const ToDoItem = ({ task, index }) => {

    return (
        <li className={styles.item}>
            <div className={styles.item_block}>
                <span className={styles.index}>{index + 1}</span>
                <h3 className={styles.title}>{task}</h3>
            </div>
            <button className={styles.btn}>
                <img src={btnItem} />
            </button>
        </li>
    )
}
