import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: AdminLayoutComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products/list',
        component:  ProductListComponent,
      },
    ],
  },
  {
    path: 'details/:id',
    component: ProductDetailComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
