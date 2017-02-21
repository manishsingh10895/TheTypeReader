import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { TextService } from './services/text.service';
import { RouteDataService } from './route-data.service';
import { TypingComponent } from './typing/typing.component';
import { StatsService } from './services/stats.service';
import { TimeService } from './services/time.service';
import { NewsService } from './services/news.service';
import { WindowRefService } from './services/window-ref.service';
import { ConfigService } from './services/config.service';

import { routes } from './app.routes';
import { TypingTextComponent } from './typing/typing-text/typing-text.component';
import { WordsPipe } from './pipes/words.pipe';
import { TypedTextComponent } from './typing/typed-text/typed-text.component';
import { CharactersPipe } from './pipes/characters.pipe';
import { TimerComponent } from './timer/timer.component';
import { ResultsComponent } from './results/results.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TypingTextComponent,
    WordsPipe,
    TypingComponent,
    TypedTextComponent, 
    CharactersPipe,
    TimerComponent,
    ResultsComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    JsonpModule
  ],
  providers: [
    WordsPipe,
    TextService,
    TimeService,
    RouteDataService,
    StatsService,
    NewsService,
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
