import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'manga/:id',
    loadComponent: () => import('./features/manga/pages/manga-detail/manga-detail.component').then(m => m.MangaDetailComponent)
  },
  {
    path: 'browse',
    loadComponent: () => import('./features/browse/pages/browse-page/browse-page.component').then(m => m.BrowsePageComponent)
  },
  {
    path: 'library',
    loadComponent: () => import('./features/library/pages/library-page/library-page.component').then(m => m.LibraryPageComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/pages/shop-page/shop-page.component').then(m => m.ShopPageComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
