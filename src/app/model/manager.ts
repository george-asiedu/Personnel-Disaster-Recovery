export interface Manager {
    name: string,
    email: string,
    phoneNumber: string
}

export interface ManagerResponse {
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        phoneNumber: number,
        image: string,
        status: string,
        created_at: Date
    }
}

export interface Managers {
    id: string,
    name: string,
    email: string,
    phoneNumber: number,
    image: File,
    status: string,
    created_at: Date
}

export interface GetManagerResponse {
    data: {
        count: number,
        managers: Managers[]
    }
}