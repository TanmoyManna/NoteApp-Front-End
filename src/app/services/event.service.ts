import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private storage: StorageService) { }

  isHttpRequest = new BehaviorSubject<boolean>(false);

  login = new BehaviorSubject(this.storage.isAuthenticate());
  isLogedin = this.login.asObservable();

  setLoginEmmit(isLogin: boolean) {
    return this.login.next(isLogin);
  }
}
