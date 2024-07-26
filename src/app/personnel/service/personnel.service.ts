import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GetPersonnel, Personnel, Profile } from '../../model/profile';
import { Observable } from 'rxjs';
import { GetProjects, Project, ProjectResponse } from '../../model/project';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  protected baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  personnelProfile(profile: Profile): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/personnels`, profile)
  }

  getPersonnelData(page: number, want?: string): Observable<GetPersonnel> {
    return this.http.get<GetPersonnel>(`${this.baseUrl}/personnels?page=${page}&want=${want}`)
  }

  getPersonnelById(id: string): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.baseUrl}/personnels/${id}`)
  }

  deletePersonnelProfile(id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/personnels/${id}`, id)
  }

  addProject(project: Project): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(`${this.baseUrl}/projects`, project)
  }

  getProjects(page: number, want?: string): Observable<GetProjects> {
    return this.http.get<GetProjects>(`${this.baseUrl}/projects?page=${page}&want=${want}`)
  }

  updateProject(id: string, project: Project): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(`${this.baseUrl}/projects/${id}`, project)
  }

  deleteProject(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/projects/${id}`)
  }
}