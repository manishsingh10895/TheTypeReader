import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { RouteDataService } from '../route-data.service';

import { Animations } from '../app.animations';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.routeAnimation
})
export class ResultsComponent implements OnInit {
  stats;
  prevStats;
  loaded: boolean = false;

  constructor(private rdService: RouteDataService, private statsService: StatsService) { 
    this.stats = statsService.getTypingStats();
    this.prevStats = statsService.getPreviousStats();

    console.log(this.stats);
  }

  ngOnInit() {
    this.loaded = true
  }

}
