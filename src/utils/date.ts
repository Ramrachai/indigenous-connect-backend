export const parseDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
    }

    return { start, end };
};