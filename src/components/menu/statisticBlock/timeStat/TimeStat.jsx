import React from 'react'
import styles from './TimeStat.module.css'
import focusSVG from '../../../../img/focus.svg'
import stopsSVG from '../../../../img/stops.svg'
import pausesSVG from '../../../../img/pauses.svg'
import focusSVGgrey from '../../../../img/focus_grey.svg'
import stopsSVGgrey from '../../../../img/stop_grey.svg'
import pausesSVGgrey from '../../../../img/pause_grey.svg'

export const TimeStat = ({ title, statistic, tomato }) => {
    let imageSource;
    let containerClass;

    switch (title) {
        case 'Фокус':
            imageSource = tomato === 0 ? focusSVGgrey : focusSVG;
            containerClass = `${styles.container} ${styles.container_focus}`;
            break;
        case 'Остановки':
            imageSource = tomato === 0 ? stopsSVGgrey : pausesSVG;
            containerClass = `${styles.container} ${styles.container_pause}`;
            break;
        default:
            imageSource = tomato === 0 ? pausesSVGgrey : stopsSVG;
            containerClass = `${styles.container} ${styles.container_stop}`;
    }
    
    if (tomato === 0) {
        containerClass += ` ${styles.container_grey}`;
    }

    return (
        <div className={containerClass}>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.statistic}>{statistic}</p>
            </div>
            <img className={styles.img} src={imageSource} alt="" />
        </div>
    );
};
