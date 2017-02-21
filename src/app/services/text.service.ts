import { Injectable } from '@angular/core';
import { NewsService } from './news.service';
import { RouteDataService } from '../route-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TextService {
  text: BehaviorSubject<string> = new BehaviorSubject<string>('');
  timerSubscription;
  
  sampleTitle = "randome leaks generated";


  getText() {;
    return this.newsService.getChannelNews(this.rdService.getItem('newsType'));
  }

  addNewerText() {
    this.newsService.getContiguosChannelNews(this.rdService.getItem('newsType')).subscribe((res) =>{
      let allArticlesCombined = "";
      res.articles.forEach((article) => {
        allArticlesCombined += '%title%' + article.title + "$title$ " +  '%description%' + article.description + '$description$ '; 
      });
      let processedArticles = this.processData(allArticlesCombined);
      this.text.next(allArticlesCombined);
    });
  }

  private subscribeToData():void {
    this.timerSubscription = Observable.timer(2000, 50000).subscribe(() => {
      this.addNewerText();
    })
  }

  private processData(articles: string) {

  }

  constructor( private rdService: RouteDataService, private newsService: NewsService) { 
    this.subscribeToData();
    // this.text.next('%title%'+ this.sampleTitle + '$title$ ' + '%description%' + 'some things are just absurd' +'$description$ ');
  }

}
