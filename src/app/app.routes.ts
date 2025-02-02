import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
