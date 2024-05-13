import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { HomeComponent } from './pages/admin/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  {
    path: 'home',
    redirectTo: '/',
  },
  {
    path: 'admin',
    component: ProductListComponent,
    children: [
      {
        path: 'products/list',
        component: AdminLayoutComponent,
      },
    ],
  },
];
