import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getData(key: string): any {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null;
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
