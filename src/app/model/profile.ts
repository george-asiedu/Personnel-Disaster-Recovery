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

export interface EducationalBackground {
    qualification: string;
    studyField: string;
    graduationYear: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
  }
  
  export interface Profession {
    name: string;
  }
  
  export interface PersonnelProfession {
    employeeId: string;
    currentPosition: string;
    employerName: string;
    employerEmail: string;
    experienceYears: number;
  }
  
  export interface PersonnelData {
    id: string;
    availability: string;
    digitalAddress: string;
    dob: Date;
    gender: string;
    houseNumber: string;
    phoneNumber: string;
    status: string;
    town: string;
    userId: string;
    educationalBackground: EducationalBackground;
    user: User;
    profession: Profession;
    personnelProfession: PersonnelProfession;
    totalProjects: number;
  }
  

export interface PersonnelDetails {
    data: PersonnelData
}