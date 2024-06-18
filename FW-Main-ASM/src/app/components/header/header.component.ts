
import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductSearchComponent } from '../product-search/product-search.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,ProductSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

}
