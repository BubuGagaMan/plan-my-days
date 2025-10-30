export const getDateRange = (fromDate: string, toDate: string) => {
    // Note: Month is 1-based in the parameters, but 0-based in JS Date
    const start = new Date(fromDate);
    const end = new Date(toDate);

    let rangeStart = start;
    let rangeEnd = end;
    if (end < start) {
        rangeStart = end;
        rangeEnd = start;
    }

    const result = [];
    let current = new Date(rangeStart);

    while (current <= rangeEnd) {
        // Format yyyy-mm-dd
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, "0");
        const day = String(current.getDate()).padStart(2, "0");
        result.push(`${year}-${month}-${day}`);

        // Increment by 1 day
        current.setDate(current.getDate() + 1);
    }

    return result;
};
