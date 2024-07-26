export interface EmergencyTypes {
    message: string,
    data: {
        id: string,
        name: string,
        status: string
    }
}

export interface GetEmergencyTypes {
    data: {
        count: number,
        emergencyTypes: EmergencyType[]
    }
}

export interface EmergencyType {
    id: string,
    name: string,
    status: string,
    created_at: Date
}