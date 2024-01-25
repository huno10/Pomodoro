import React from 'react'
import styles from './Timer.module.css'

const pomodor = 'Помидор 1'

export const Timer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toDo_header}>
        <h3 className={styles.title}>Сверстать сайт</h3>
        <p className={styles.toDo_name}>{pomodor}</p>
      </div>
    </div>
  )
}
