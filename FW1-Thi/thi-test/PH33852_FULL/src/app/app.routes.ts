import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

    {
        path:'',
        canActivate:[authGuard],
        component:ProductListComponent,
    },
    {
        path:'product/add',
        canActivate:[authGuard],
        component:ProductAddComponent,
    },
    {
        path:'product/edit/:id',
        canActivate:[authGuard],
        component:ProductEditComponent,
    },


    {
        path:'register',
        component:RegisterComponent,
    },
    {
        path:'login',
        component:LoginComponent,
    }
];
