import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    component: ListComponent,
  },
  {
    path: 'product/add',
    canActivate:[authGuard],
    component: AddComponent,
  },
  {
    path: 'product/edit/:id',
    canActivate:[authGuard],
    component: EditComponent,
  },
  /////////
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
