
import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

export const routes: Routes = [
    {
        path:'',
        component: ProductListComponent ,
    },
    {
        path:'product/add',
        component: ProductAddComponent ,
    },
    {
        path:'product/edit/:id',
        component: ProductEditComponent ,
    }
];
