export type FormDBDocType = {
    order_ref: string,
    order_item: number,
    surname: string,
    first_name: string,
    banking: number | string,
    email: string,
    save_data: boolean,
}

export type NoticeData = {
    statusCode: number,
    msg: string,
    order_ref: string
}

// export type LoginData = {
//     email: string,
//     password: string
// }

