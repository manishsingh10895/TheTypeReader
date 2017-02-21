import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams }  from '@angular/http';
import { ConfigService } from '../services/config.service';
import { Observable }  from 'rxjs';

@Injectable()
export class NewsService {
  sources = { entertainment: [], general: [], sports: [], technology: [], business: [] };
  private currentChannel = 0;

  getChannelNews(channel) {
    let params = new URLSearchParams();
    params.set('source', channel);
    params.set('apiKey', ConfigService.newsApiKey);

    console.log(params);
    return this.http.get(ConfigService.newsApi + '/articles', {search: params})
      .map(res => res.json())
      .catch(err =>  Observable.throw(err.json()));
  }

  getContiguosChannelNews(newsType: string = 'general') {
    console.log(this.sources);
    console.log(newsType, this.currentChannel);
    console.log(this.sources[newsType][this.currentChannel++]);
    return this.getChannelNews(this.sources[newsType][this.currentChannel++]['id']);
  }

  getNews() {
    return this.http.get(ConfigService.newsApi)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  getAllSources() {
    return this.http.get(ConfigService.newsApi + '/sources?language=en')
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  getSources(category: string) {
    return this.sources[category];
  }

  constructor(private http: Http) {
    this.getAllSources().subscribe((res) => {
        res.sources.forEach((source) => {
          switch(source.category) {
            case 'general': this.sources.general.push(source); break;
            case 'sport': this.sources.sports.push(source); break;
            case 'entertainment': this.sources.entertainment.push(source);
            case 'technology': this.sources.technology.push(source);
            case 'business': this.sources.business.push(source);
          }
        });      
    });
  }

  ngOnDestroy() {
    this.currentChannel = 0;
  }
}
