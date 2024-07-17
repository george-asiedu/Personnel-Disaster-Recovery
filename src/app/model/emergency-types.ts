export interface EmergencyTypes {
    message: string,
    data: {
        id: number,
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
    id: number,
    name: string,
    status: string
}