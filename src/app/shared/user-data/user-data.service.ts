import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../model/login';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userSubject = new BehaviorSubject<LoginResponse['data']['user'] | null>(this.loadUserData())
  user$ = this.userSubject.asObservable()

  constructor() {}

  setUser(user: LoginResponse['data']['user']) {
    this.userSubject.next(user)
    this.saveUserData(user)
  }

  getUser(): LoginResponse['data']['user'] | null {
    return this.userSubject.value
  }

  private saveUserData(user: LoginResponse['data']['user']): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  private loadUserData(): LoginResponse['data']['user'] | null {
    const userObject = localStorage.getItem('user')
    return userObject ? JSON.parse(userObject) : null
  }

  clearUserData(): void {
    localStorage.removeItem('user')
    this.userSubject.next(null)
  }
}