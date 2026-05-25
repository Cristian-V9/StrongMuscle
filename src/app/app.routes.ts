import { Routes } from '@angular/router';
import { authGuard, gatedGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent),
  },

  // Mi Actividad — versión real (protegida) + versión bloqueada
  {
    path: 'mi-actividad',
    canActivate: [gatedGuard('/mi-actividad-bloqueada')],
    loadComponent: () => import('./mi-actividad/mi-actividad').then(m => m.MiActividadComponent),
  },
  {
    path: 'mi-actividad-bloqueada',
    loadComponent: () => import('./mi-actividad/mi-actividad-locked').then(m => m.MiActividadLockedComponent),
  },

  // Rutinas — versión real (protegida) + versión bloqueada
  {
    path: 'rutinas',
    canActivate: [gatedGuard('/rutinas-bloqueada')],
    loadComponent: () => import('./rutinas/rutinas').then(m => m.RutinasComponent),
  },
  {
    path: 'rutinas-bloqueada',
    loadComponent: () => import('./rutinas/rutinas-locked').then(m => m.RutinasLockedComponent),
  },

  // Perfil — estrictamente privado
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./perfil/perfil').then(m => m.PerfilComponent),
  },

  { path: '**', redirectTo: 'home' },
];
