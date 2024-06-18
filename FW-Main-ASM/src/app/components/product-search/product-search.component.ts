import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  searchTerm: string = '';

  onSearch() {
    console.log('Searching for:', this.searchTerm);
    // Add search logic here
  }
}
