import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage), // <-- usar HomePage (named export)
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
      },

      {
        path: 'trip/:id',
        loadComponent: () =>
          import('./pages/trip-detail/trip-detail.page').then(
            m => m.TripDetailPage
          )
      },

      {
        path: 'history',
        loadComponent: () =>
          import('./pages/history/history.page').then(m => m.HistoryPage)
      },

      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.page').then(m => m.SettingsPage)
      }
    ]
  },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
