class CustomError extends Error {
    statusCode: number;
    location: string;

    constructor(message: string, statusCode: number, location: string) {
        super(message);
        this.statusCode = statusCode;
        this.location = location;
    }
}

export const customError = (msg: string, location: string): Error => {
    const statusCode = 500;
    throw new CustomError(msg, statusCode, location) as Error;
}