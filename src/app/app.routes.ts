import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserDetailsComponent },
];
