import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from './componets/header/header.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
//

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [

    CommonModule,
    RouterOutlet,
    NgFor,
    RouterLink,
    RouterLinkActive,
    //
    HeaderComponent,
   
    ProductListComponent
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
 
  
}
