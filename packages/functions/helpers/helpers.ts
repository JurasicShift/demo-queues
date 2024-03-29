export const createdAt = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    return date.toISOString();
}