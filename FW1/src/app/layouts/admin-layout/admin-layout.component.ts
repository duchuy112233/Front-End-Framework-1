import { Component } from '@angular/core';
import { ProductListComponent } from '../../pages/admin/products/list/list.component';
import { HeaderComponent } from '../../componets/header/header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ProductListComponent, HeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
