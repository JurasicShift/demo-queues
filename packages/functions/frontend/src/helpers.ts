export const uniqueOrderRef = (name: string) => {
    return 3771 + name.toUpperCase() + Math.floor(Math.random() * 6000);
}