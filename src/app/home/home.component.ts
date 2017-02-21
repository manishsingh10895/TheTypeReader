import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { Jquery } from '../classes/jquery';

import { RouteDataService } from '../route-data.service';

declare var jQuery: any;

import  { Animations } from '../app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.routeAnimation
})
export class HomeComponent implements OnInit {
  selectedNewsType: string = '';
  channelTypes = ConfigService.channelTypes;
  sources: Array<any>;
  endless: boolean = false;

  constructor(private rdService: RouteDataService, private router: Router, private newsService: NewsService) { }

  ngOnInit() {

  }

  sourcesHover(e: Event) {
    e.stopPropagation();
  }

  viewSources(e: Event, newsType: string) {
    e.stopPropagation();
    this.sources = this.newsService.getSources(newsType);
    jQuery('.ui.modal').modal('show');
  }

  handleNewsTypeClick(newsType: string) {
    this.selectedNewsType = newsType;
    this.rdService.setItem('newsType', newsType);
  }

  handleMinuteChange(minutes) {
    console.log(minutes);
    this.rdService.setItem('totalMinutes', minutes);
  }

  handleSecondChange(seconds) {
    console.log(seconds);
    this.rdService.setItem('totalSeconds', seconds);
  }

  toggleEndless() {
    console.log(this.endless);
    this.endless = !this.endless;
    this.rdService.setItem('endless', this.endless);
  }

  goTyping() {
    this.router.navigate(['/typing']);
  }
}
