import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ImageResponse } from '../model/image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  protected baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  changeImage(formData: FormData): Observable<ImageResponse> {
    return this.http.post<ImageResponse>(`${this.baseUrl}/users/change-image`, formData)
  }
}