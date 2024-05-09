import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
//
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { Lab1Component } from './pages/lab1/lab1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgFor,
    //
    HeaderComponent,
    ProductListComponent,
    Lab1Component,
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
