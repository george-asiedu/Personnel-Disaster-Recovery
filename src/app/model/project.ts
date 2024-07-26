export interface Project {
    title: string,
    description: string
}

export interface ProjectResponse {
    message: string,
    data: {
        id: number,
        created_at: Date,
        description: string,
        title: string
    }
}

export interface GetProjects {
    data: {
        count: number,
        projects: Projects[]
    }
}

export interface Projects {
    id: string,
    created_at: Date,
    description: string,
    title: string
}