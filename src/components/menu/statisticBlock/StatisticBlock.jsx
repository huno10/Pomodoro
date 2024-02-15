import React, { useEffect, useState } from 'react'
import styles from './StatisticBlock.module.css'
import { DateInfo } from './dateInfo/DateInfo'
import { DiagramBlock } from './diagramBlock/DiagramBlock'
import { TimeStat } from './timeStat/TimeStat'
import { useSelector } from 'react-redux'

const formattedWorkTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return formattedTime
}

export const StatisticBlock = () => {

    const statistics = useSelector((state) => state.stats);
    const [updatedStatistics, setUpdatedStatistics] = useState(null);
    const [totalInterval, setTotalInterval] = useState(0);

    useEffect(() => {
        setUpdatedStatistics(statistics);
    }, [statistics]);

    let asa = formattedWorkTime(updatedStatistics.workTime)
    console.log(asa)
    return (
        <section>
            <div className={styles.container}>
                <div className={styles.head_block}>
                    <h2 className={styles.title}>Ваша активность</h2>
                    <select className={styles.select} name="" id="">
                        <option className={styles.option} value="">Эта неделя</option>
                        <option className={styles.option} value="">Прошедшая неделя</option>
                        <option className={styles.option} value="">2 недели назад</option>
                    </select>
                </div>

                <div className={styles.diagram_tomato}>
                    <DateInfo />
                    <DiagramBlock />
                </div>

                <div className={styles.stat_wrapper}>
                    <TimeStat title='Фокус' />
                    <TimeStat title='Время на паузе' />
                    <TimeStat title='Остановки' />
                </div>



            </div>
        </section>
    )
}
