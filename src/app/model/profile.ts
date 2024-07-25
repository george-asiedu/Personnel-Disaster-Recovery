export interface Profile {
    userId: string,
    dob: string,
    gender: Gender,
    phoneNumber: string,
    houseNumber: string,
    town: string,
    digitalAddress: string,
    employeeId: string,
    professionId: number,
    employerName: string,
    employerEmail: string,
    currentPosition: Position,
    experienceYears: number,
    qualification: string,
    studyField: string,
    graduationYear: number
}

export enum Position {
    JUNIOR = 'JUNIOR',
    ASSOCIATE = 'ASSOCIATE',
    EXPERT = 'EXPERT'
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface GetPersonnel {
    count: number,
    personnel: Personnel[]
}

export interface Personnel {
    id: string,
    name: string,
    email: string,
    image: string
    profession: string,
    status: string,
    createdAt: Date
}