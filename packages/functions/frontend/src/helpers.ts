export const uniqueOrderRef = (name: string) => {
    return 3771 + name.toUpperCase() + Math.floor(Math.random() * 6000);
}

export const hash = Math.floor(Math.random() * 90000) + 10000;

