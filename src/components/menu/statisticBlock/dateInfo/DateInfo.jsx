import React from 'react'
import svgTomato from '../../../../img/tomato.svg'
import styles from './DateInfo.module.css'

export const DateInfo = () => {
    return (
        <div className={styles.date_box}>
            <div className={styles.date_info}>
                <h3 className={styles.date_title}>Понедельник</h3>
                <p className={styles.date_descr}>Вы работали над задачами в течение 51 минуты</p>
            </div>
            <div>
                <div className={styles.tomato}>
                    <img src={svgTomato} alt="" />
                    <span className={styles.count_tomato}>x 2</span>
                </div>
                <div className={styles.tomato_wrap}>
                    <p className={styles.tomato_descr}>2 Помидора</p>
                </div>
            </div>
        </div>
    )
}
