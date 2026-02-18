// app.routes.ts
import { Routes } from '@angular/router';
import { guestGuard } from './authguards/guards/guest-guard';
import { authGuard } from './authguards/guards/auth-guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./authfolder/login/login').then(m => m.Login),
    canActivate: [guestGuard]
  },
  { 
    path: 'register', 
    loadComponent: () => import('./authfolder/registration/registration').then(m => m.Registration),
    canActivate: [guestGuard]
  },
  { 
    path: 'home', 
    loadComponent: () => import('./main-menu-pages/home/home').then(m => m.Home),
    canActivate: [authGuard] 
  },
  { 
    path: 'epuja', 
    loadComponent: () => import('./main-menu-pages/e-pooja/e-pooja').then(m => m.EPooja),
    canActivate: [authGuard] 
  },
  { 
  path: 'daily-horoscope/:sign', 
  loadComponent: () => import('./features-pages/daily-horoscope/daily-horoscope').then(m => m.DailyHoroscope),
  canActivate: [authGuard] 
},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Change this to login so users are forced to authenticate if they get lost
  { path: '**', redirectTo: 'login' } 
];