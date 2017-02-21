import { Component, OnInit, Input, ViewChild , ElementRef, EventEmitter, OnDestroy} from '@angular/core';
import { TimeService } from '../services/time.service';
import { RouteDataService } from '../route-data.service';

import { Animations } from '../app.animations';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  animations: Animations.slideAnimation,
  outputs: ['remainingSeconds', 'timesUp']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input('minutes') minutes: number = 0;
  @Input('seconds') seconds: number = 0;
  mouseOver = 'mouseout';

  remainingTime: number = this.getRemainingTime();

  timesUp: EventEmitter<any> = new EventEmitter<any>();

  private interval: NodeJS.Timer;
  private endless: false;

  constructor(private rdService: RouteDataService, private timeService: TimeService) { 

  }

  private getRemainingTime() {
    return this.timeService.getTotalSeconds(this.minutes, this.seconds);
  }

  ngOnInit() {
    this.endless = this.rdService.getItem('endless');
    if(this.endless) {
      this.minutes = 0;
      this.seconds = 0;
      this.startTimerUp();
    } else {
      this.startTimer();
    }
  }

  // Start timer but increments
  startTimerUp() {
    this.interval = setInterval(() => {
      if(this.seconds == 60) {
        this.seconds = 0;
        this.minutes++;
      } else {
        this.seconds++;
      }
    },1000 );
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.seconds == 0 && this.minutes > 0) {
        this.seconds = 60;
        this.minutes--;
      }
      else if(this.seconds == 0 && this.minutes == 0) {
        this.clearTimer();
        this.timesUp.emit();
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  clearTimer() {
    this.seconds = 0;
    this.minutes = 0;
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    console.log(this.getRemainingTime());
    this.rdService.setItem('remainingSeconds', this.getRemainingTime());
    this.clearTimer();
  }

  onMouseOver() {
    this.mouseOver = 'mouseover';
  }

  onMouseOut() {
    this.mouseOver = 'mouseout';
  }

}