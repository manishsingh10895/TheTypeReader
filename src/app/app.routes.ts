import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TypingComponent } from './typing/typing.component';
import { ResultsComponent } from './results/results.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'typing', component: TypingComponent },
  { path: 'results', component: ResultsComponent }
];
