import { Injectable } from '@angular/core';

@Injectable()
export class RouteDataService {
  private data = {};

  setItem(key:string, value: any) {
    console.log(key, value);
    Object.defineProperty(this.data, key, {
      enumerable: true,
      writable: true,
      value: value
    });
  }

  getItem(key: string) {
    return this.data[key];
  }

  clearItem(key: string) {
    if(this.data[key]) 
      delete this.data[key];
  }

  clearAll() {
    this.data = {};
  }

  constructor() {
    this.data = { totalMinutes: 2, totalSeconds: 15 };
  }

}
