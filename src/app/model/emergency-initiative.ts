export interface EmergencyInitiative {
    dispatched_date: string,
    location: string,
    emergencyTypeId: string,
    description: string,
    managerId: string,
    end_date: string,
    state: string,
    professions: number[]
}

export interface EmergencyInitiativeResponse {
    message: string,
    data: {
        id: string,
        dispatched_date: Date,
        location: string,
        description: string,
        end_date: Date,
        state: string,
        emergencyType: Emergency,
        manager: Manager
    }
}

export interface Initiative {
    id: string,
    created_at: Date,
    dispatched_date: Date,
    location: string,
    emergencyType: Emergency,
    description: string,
    manager: Manager,
    end_date: Date,
    state: string
}

export interface Manager {
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    created_at: Date,
    status: string,
    image: string
}

export interface Emergency {
    id: string,
    created_at: Date,
    name: string,
    status: string
}

export interface GetEmergencyInitiative {
    data: {
        count: number,
        initiatives: Initiative[]
    }
}

export interface GetEmergencyInitiativeById {
    data: {
        id: number;
        created_at: string;
        dispatched_date: string;
        location: string;
        emergencyType: {
          id: number;
          created_at: string;
          name: string;
          status: string;
        };
        description: string;
        manager: {
          id: number;
          created_at: string;
          name: string;
          phoneNumber: string;
          image: string;
          email: string;
          status: string;
        };
        end_date: string;
        state: string;
        emergencyInitiativePersonnel: {
          personnel: {
            gender: string;
            phoneNumber: string;
            digitalAddress: string;
            dob: string;
            town: string;
            educationalBackground: {
              id: number;
              qualification: string;
              studyField: string;
              personnelId: number;
              graduationYear: number;
            };
            user: {
              name: string;
              email: string;
              image: string;
            };
          };
        }[];
      };
}

export interface InitiativePersonnel {
    personnel: Personnel,
    user: User
}

export interface Personnel {
    gender: string,
    phoneNumber: string,
    digitalAddress: string,
    dob: Date,
    town: string,
    educationalBackground: EducationalBackground
}

export interface EducationalBackground {
    id: string,
    qualification: string,
    studyField: string,
    personnelId: number,
    graduationYear: number
}

export interface User {
    name: string,
    email: string,
    image: string
}