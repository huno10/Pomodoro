export function pauseTimer(startTime, endTime) {
  const seconds = Math.floor((endTime - startTime) / 1000);
  return seconds;
}

export const formatTime = (hours, minutes, seconds) => {
  const hoursWord = (hours === 1 || (hours > 20 && hours % 10 === 1)) ? 'час' : 'часов';
  const minutesWord = (minutes === 1 || (minutes > 20 && minutes % 10 === 1)) ? 'минута' : 'минут';
  const secondsWord = (seconds === 1 || (seconds > 20 && seconds % 10 === 1)) ? 'секунда' : 'секунд';

  if (hours > 0) {
    return `${hours} ${hoursWord} ${minutes} ${minutesWord}`;
  } else if (minutes > 0) {
    return `${minutes} ${minutesWord}`;
  } else {
    return `${seconds} ${secondsWord}`;
  }
};

export const formatOfHoursAndMinutes = (sec) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  return [hours, minutes, seconds]
}

export function formatPauseTime(hours, minutes, seconds) {
  if (hours === 0) {
    if (minutes === 0) {
      if (seconds === 0) {
        return seconds;
      }
    } else {
      return `${minutes}м`;
    }
  } else if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

export function focus(workTime, pauseTime) {
  const total = workTime + pauseTime;

  if (total === 0) {
    return 0;
  }
  const focusPercentage = (workTime / total) * 100;

  const roundedFocusPercentage = Math.round(focusPercentage);

  return `${roundedFocusPercentage}%`;
}

export function filterArrayStatistic(arr, weekNumber) {
  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  return daysOfWeek.map((day) => {
    const existing = arr.find(data => data.dayOfWeek === day && data.week === weekNumber);

    if (existing) {
      return existing;
    } else {
      return {
        dayOfWeek: day,
        week: weekNumber,
        workTime: 0,
        pauseTime: 0,
        stops: 0,
        tomato: 0
      };
    }
  });
}

export function filterArrayByDay(arr, day) {
  const result = arr.find(data => {
    return data.dayOfWeek.toLowerCase() === day.toLowerCase();
  });

  return result;
}

export function getWeekAndDay(date) {
  const weekNumber = Math.ceil(((date - new Date(date.getFullYear(), 0, 1)) / 86400000 + 1) / 7);
  const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });

  return { week: weekNumber, dayOfWeek: dayOfWeek };
}

export function getFullDayName(abbreviation) {
  const day = abbreviation.toLowerCase()
  const daysOfWeek = {
    'пн': 'Понедельник',
    'вт': 'Вторник',
    'ср': 'Среда',
    'чт': 'Четверг',
    'пт': 'Пятница',
    'сб': 'Суббота',
    'вс': 'Воскресенье'
  };

  return daysOfWeek[day];
}