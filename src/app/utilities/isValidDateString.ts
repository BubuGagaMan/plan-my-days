export function isValidDateString(dateString: string | undefined | string[]) {
    if (typeof dateString !== "string") return false;

    // Step 1: Check format (yyyy-mm-dd)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    // Step 2: Parse and validate components
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    // Step 3: Check if the parsed date matches the original input
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
