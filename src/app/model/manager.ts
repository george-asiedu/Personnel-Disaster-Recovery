export interface Manager {
    name: string,
    email: string,
    phoneNumber: number
}

export interface ManagerResponse {
    message: string,
    data: {
        count: number,
        manager: Manager[]
    }
}