import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  getTotalSeconds(minutes: any, seconds:any): number {
    return (parseInt(minutes) * 60) + parseInt(seconds);
  }

  getTotalMinutes(minutes: number, seconds: number) : number {
    return minutes + Math.floor(seconds / 60);
  }

  convertSecondsToMinutes(seconds: number): number {
    return Math.round((seconds / 60) * 100) / 100;
  }

  convertMinutesToSeconds(minutes: number) : number {
    return minutes * 60;
  }

  formatMinutes(minutes: number) {
    let seconds = Math.floor(minutes * 60);
    
    seconds = seconds % 60;
    minutes = Math.floor(minutes);

    return minutes +  " m: " + seconds + " s";
  }
}
