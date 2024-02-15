const useFormatTimer = (start, stop) => {
    const [startMin, startSec] = start.split(':').map(Number);
    const [stopMin, stopSec] = stop.split(':').map(Number);

    const totalSeconds = (startMin * 60 + startSec) - (stopMin * 60 + stopSec);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (formattedTime);
}

export default useFormatTimer;