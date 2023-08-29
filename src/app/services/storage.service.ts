import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-ts';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  TEMP = {
    KEY: 'project_auth',
    PASSWORD: '90590348534YYIU!@00asfdadsf@£sxfcdf'
  };
  USER = {
    KEY: 'project_auth0',
    PASSWORD: '!##0895*()?:}95047834&&tes12323?ADSLklo'
  };


  constructor(
    private cookie: CookieService
  ) { }

  // ENCRYPT DATA
  private encription(data: any, secret: string) {
    return CryptoTS.AES.encrypt(JSON.stringify(data), secret);
  }

  // DECRYPT DATA
  private decription(data: any, secret: string) {
    const bytes = CryptoTS.AES.decrypt(data.toString(), secret);
    return JSON.parse(bytes.toString(CryptoTS.enc.Utf8));
  }

  //  SAVE USER COOKIES DATA
  async setUser(data: any) {
    const myDate: Date = new Date();
    myDate.setHours( myDate.getHours() + 2 );
    return this.cookie.set(this.USER.KEY, this.encription(data, this.USER.PASSWORD).toString(), myDate, '/', '', false, 'Strict');
  }

  // GET SAVED USER COOKIES DATA
  getUser() {
    const DATA = this.cookie.get(this.USER.KEY) !== null ? this.cookie.get(this.USER.KEY) : undefined;
    if (DATA && DATA !== undefined) {
      return this.decription(DATA, this.USER.PASSWORD);
    } else {
      return undefined;
    }
  }

  // CLEAR USER COOKIES DATA
  clearUser() {
    this.cookie.delete(this.USER.KEY, '/');
    this.cookie.delete(this.USER.KEY, '/user');
    this.cookie.delete(this.USER.KEY, '/user/*');
  }

  // GET USER COOKIES DATA BY KEY NAME
  getDataField(type: string) {
    if (this.getUser() !== undefined && this.getUser()[type] !== undefined) {
      return this.getUser()[type];
    } else {
      return undefined;
    }
  }

  // DETECT USER'S TOKEN IS AVAILABLE OR NOT
  isAuthenticate(): boolean {
    return this.getDataField('token') !== undefined;
  }

  // SAVE TEMP DATA WHEN REQUIRED
  setTempData(data: any) {
    return this.cookie.set(this.TEMP.KEY, this.encription(data, this.TEMP.PASSWORD).toString());
  }

  // GET SAVED TEMP DATA
  getTempData() {
    const DATA = this.cookie.get(this.TEMP.KEY) !== null ? this.cookie.get(this.TEMP.KEY) : undefined;
    if (DATA && DATA !== undefined) {
      return this.decription(DATA, this.TEMP.PASSWORD);
    } else {
      return false;
    }
  }

  // DELETE ANY TEMP DATA IF EXIST
  clearTempData() {
    return this.cookie.delete(this.TEMP.KEY);
  }
}
