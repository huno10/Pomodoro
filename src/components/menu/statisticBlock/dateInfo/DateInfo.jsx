import React from 'react'
import svgTomato from '../../../../img/tomato.svg'
import svgTomato0 from '../../../../img/Tomato0.svg'
import styles from './DateInfo.module.css'
import { formatTime, formatOfHoursAndMinutes, getFullDayName } from '../../../../utils/formatTimer';

export const DateInfo = ({ totalWorkTime, totalTomato, day }) => {
    const [hours, minutes, seconds] = formatOfHoursAndMinutes(totalWorkTime)

    const minutesWorked = formatTime(hours, minutes, seconds);
    const dayOfWeek = getFullDayName(day)

    return (
        <div className={styles.date_box}>
            <div className={styles.date_info}>
                <h3 className={styles.date_title}>{dayOfWeek}</h3>
                <p className={styles.date_descr}>
                    {totalWorkTime > 0
                        ? <>Вы работали над задачами в течение <span className={styles.date_text}>
                            {String(minutesWorked)}
                        </span> </>
                        : 'Нет данных'}
                </p>
            </div>
            <div>
                <div className={styles.tomato}>
                    {totalTomato > 0 ?
                        <>
                            <div className={styles.tomato_count}>
                                <img src={svgTomato} alt="" />
                                <span className={styles.count_tomato}>x {totalTomato}</span>
                            </div>
                            <div className={styles.tomato_wrap}>
                                <p className={styles.tomato_descr}>{totalTomato} Помидора</p>
                            </div>
                        </>
                        : <img src={svgTomato0} />}
                </div>
            </div>
        </div>
    )
}
