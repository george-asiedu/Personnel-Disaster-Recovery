export interface ProfessionsResponse {
    message: string,
    data: {
        id: number,
        name: string,
        emergencyId: number,
        status: string
    }
}

export interface GetProfession {
    data: {
        count: number,
        professions: Profession[]
    }
}

export interface Profession {
    id: number,
    name: string,
    status: string,
    created_at: Date
}