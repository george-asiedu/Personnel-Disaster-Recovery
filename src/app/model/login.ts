export interface Login {
    email: string,
    password: string,
}

export interface LoginResponse {
    message: string,
    data: {
        token: {
            accessToken: string,
            refreshToken: string
        },
        user: {
            id: string,
            name: string,
            email: string,
            image: string,
            role: Role,
            accountStatus: string,
            hasPersonnelData: boolean
        }
    }
}


export enum Role {
    ADMIN='ADMIN',
    PERSONNEL='PERSONNEL'
}