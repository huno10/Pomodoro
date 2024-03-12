import React from 'react'
import styles from './DiagramBlock.module.css'
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours > 0 ? `${hours} ч. ` : '';
  const formattedMinutes = minutes > 0 ? `${minutes} мин. ` : '';
  const formattedSeconds = remainingSeconds > 0 ? `${remainingSeconds} сек.` : '';

  return formattedHours + formattedMinutes + formattedSeconds;
}

function calculateWorkTimeStats(data) {
  const workTimes = data.map(item => item.workTime);

  let maxWorkTime = Math.max(...workTimes);

  const sortedWorkTimes = [...workTimes].sort((a, b) => a - b);

  const length = sortedWorkTimes.length;

  const maxValue = sortedWorkTimes[length - 1];

  const floorValue = Math.floor(maxValue);

  maxWorkTime = formatTime(Math.floor(maxWorkTime))
  const median1 = formatTime(Math.floor(floorValue / 4));
  const median2 = formatTime(Math.floor(floorValue / 2));
  const median3 = formatTime(Math.floor((floorValue * 3) / 4));

  return {
    maxWorkTime,
    median1,
    median2,
    median3,
  };
}

export const DiagramBlock = ({ arr, setSetday, dayOfWeek }) => {
  const { maxWorkTime, median3, median1, median2 } = calculateWorkTimeStats(arr)

  return (
    <div className={styles.container}>
      <div className={styles.chart_wrapper}>
        {[maxWorkTime, median3, median2, median1].map((value, index) => (
          <div key={index} className={styles.border_div}>
            <span className={styles.border_span} />
            <span className={styles.border_time}>{value}</span>
          </div>
        ))}
        <ResponsiveContainer className={styles.chart} width="82%" height="89%">
          <BarChart width={750} height={550} data={arr} >
            <Bar className={styles.chart_bar}
              width='77'
              dataKey="workTime"
              fill="#EA8A79"
              hide={false}
              shape={(props) => {
                const { x, y, width, height, payload } = props;

                if (payload.workTime === 0) {
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={77}
                      height={5}
                      fill="#C4C4C4"
                    />
                  );
                }

                return (
                  <rect
                    x={x}
                    y={y}
                    width={77}
                    height={height}
                    fill="#EA8A79"
                  />
                );
              }}

              onClick={(event, payload) => {
                console.log(event.name)
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.week_wrapper}>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
          <button
            key={index}
            className={`${styles.week_day} ${day === dayOfWeek ? styles.current_day : ''}`}
            onClick={() => setSetday(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
