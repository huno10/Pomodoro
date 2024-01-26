import React from 'react'
import styles from './Timer.module.css'
import intervalSvg from '../../../img/addInterval.svg'

const pomodor = 'Помидор 1'
const index = '2'
const name = 'Сверстать сайт'

export const Timer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toDo_header}>
        <h3 className={styles.title}>Сверстать сайт</h3>
        <p className={styles.toDo_name}>{pomodor}</p>
      </div>
      <div className={styles.timer_block}>
        <div className={styles.timer}>
          <p className={styles.interval}>25:00</p>
          <button className={styles.add_interval}>
            <img src={intervalSvg} alt="" />
          </button>
        </div>
        <div>
          <p className={styles.toDo_info}>
            <span className={styles.toDo_span}>{`Задача ${index} - `}</span>
            {name} </p>
        </div>
        <div className={styles.btn_wrapper}>
          <button className={styles.btn_start}>Старт</button>
          <button className={styles.btn_stop}>Стоп</button>
        </div>
      </div>
    </div>
  )
}
