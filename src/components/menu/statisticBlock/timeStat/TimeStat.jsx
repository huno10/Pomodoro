import React from 'react'
import styles from './TimeStat.module.css'
import focusSVG from '../../../../img/focus.svg'
import stopsSVG from '../../../../img/stops.svg'
import pausesSVG from '../../../../img/pauses.svg'

export const TimeStat = ({ title }) => {
    let imageSource;
    let containerClass;

    switch (title) {
        case 'Фокус':
            imageSource = focusSVG;
            containerClass = `${styles.container} ${styles.container_focus}`;
            break;
        case 'Остановки':
            imageSource = pausesSVG;
            containerClass = `${styles.container} ${styles.container_pause}`;
            break;
        default:
            imageSource = stopsSVG;
            containerClass = `${styles.container} ${styles.container_stop}`;
            break;
    }

    return (
        <div className={containerClass}>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.statistic}>35%</p>
            </div>
            <img src={imageSource} alt="" />
        </div>
    )
}
