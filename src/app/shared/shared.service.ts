import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/authService/auth.service';
import { Image, ImageResponse } from '../model/image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  protected baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private authService: AuthService) { }

  private get httpOptions() {
    const accessToken = this.authService.currentUserValue?.data.token.accessToken
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
    }
  }

  changeImage(image: Image): Observable<ImageResponse> {
    // const formData = new FormData()
    // formData.append('image', image)
    return this.http.post<ImageResponse>(`${this.baseUrl}/users/change-image`, image, this.httpOptions)
  }
}