export const getNumWeek = (selectedOption) => {
    Date.prototype.getWeek = function () {
        const date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        const week1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    };


    const currentDate = new Date();
    let targetDate;

    switch (selectedOption) {
        case 'thisWeek':
            targetDate = currentDate.getWeek();
            break;
        case 'lastWeek':
            targetDate = currentDate.getWeek() - 1;
            break;
        case 'twoWeeksAgo':
            targetDate = currentDate.getWeek() - 2;
            break;
        default:
            targetDate = currentDate;
    }
    return targetDate;
}