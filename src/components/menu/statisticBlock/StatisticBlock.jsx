import React, { useState } from 'react'
import styles from './StatisticBlock.module.css'
import { DateInfo } from './dateInfo/DateInfo'
import { DiagramBlock } from './diagramBlock/DiagramBlock'
import { TimeStat } from './timeStat/TimeStat'
import { useSelector } from 'react-redux'
import { filterArrayByDay, filterArrayStatistic, focus, formatOfHoursAndMinutes, formatPauseTime, getWeekAndDay } from '../../../utils/formatTimer'
import { getNumWeek } from '../../../utils/getNumWeek'


export const StatisticBlock = () => {
    const statistics = useSelector((state) => state.stats);

    const [selectedOption, setSelectedOption] = useState('thisWeek');

    const { dayOfWeek } = getWeekAndDay(new Date)

    const [day, setSetday] = useState(dayOfWeek);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const weekNumber = getNumWeek(selectedOption);

    const filteringByWeek = filterArrayStatistic(statistics, weekNumber)

    const filterDay = filterArrayByDay(filteringByWeek, day)

    const [hours, minutes, seconds] = formatOfHoursAndMinutes(filterDay.pauseTime)

    const pauseTime = formatPauseTime(hours, minutes, seconds)
    const focusPers = focus(filterDay.workTime, filterDay.pauseTime)


    return (
        <section>
            <div className={styles.container}>
                <div className={styles.head_block}>
                    <h2 className={styles.title}>Ваша активность</h2>
                    <select
                        className={styles.select}
                        onChange={handleSelectChange}
                        value={selectedOption}
                    >
                        <option className={styles.option} value="thisWeek">Эта неделя</option>
                        <option className={styles.option} value="lastWeek">Прошедшая неделя</option>
                        <option className={styles.option} value="twoWeeksAgo">2 недели назад</option>
                    </select>
                </div>
                <div className={styles.diagram_tomato}>
                    <DateInfo totalWorkTime={filterDay.workTime} totalTomato={filterDay.tomato} day={day} />
                    <DiagramBlock arr={filteringByWeek} setSetday={setSetday} dayOfWeek={dayOfWeek} />
                </div>
                <div className={styles.stat_wrapper}>
                    <TimeStat title='Фокус' statistic={focusPers} tomato={filterDay.tomato} />
                    <TimeStat title='Время на паузе' statistic={pauseTime} tomato={filterDay.tomato} />
                    <TimeStat title='Остановки' statistic={filterDay.stops} tomato={filterDay.tomato} />
                </div>
            </div>
        </section>
    )
}
