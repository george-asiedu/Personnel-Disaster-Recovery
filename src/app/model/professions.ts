export interface Professions {
    message: string,
    data: {
        id: number,
        name: string,
        emergencyId: number,
        status: string
    }
}

export interface CreateProfession {
    name: string,
    emergencyId: number
}

export interface GetProfession {
    data: {
        count: number,
        professions: [
            {
                id: number,
                name: string,
                emergencyId: number,
                status: string
            }
        ]
    }
}