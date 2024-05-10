import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { IProduct } from '../../../Types/Bai4';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productss: IProduct[] = [
    {
      productId: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2016',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 2.2,
      imageVisible: true,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
    },
    {
      productId: 2,

      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2016',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageVisible: true,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png',
    },
    {
      productId: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2016',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
    },
    {
      productId: 8,
      productName: 'Saw',
      productCode: 'TBX-0022',
      releaseDate: 'May 15, 2016',
      description: '15-inch steel blade hand saw',
      price: 11.55,
      starRating: 3.7,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png',
    },
    {
      productId: 10,
      productName: 'Video Game Controller',
      productCode: 'GMG-0042',
      releaseDate: 'October 15, 2015',
      description: 'Standard two-button video game controller',
      price: 35.95,
      starRating: 4.6,
      imageUrl:
        'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png',
    },
  ];

  listProduct: IProduct[] = [];
  constructor() {}
  ngOnInit(): void {
    this.listProduct = this.productss;
  }
  filterValue: string = ''; 
  filter() {
    //chọn sản phẩm có tên chưa tên giá trị nhập vào
    this.productss = this.listProduct.filter((p) =>
      p.productName.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase())
    );
  }
//
setterValue: string = ''; // Giá trị của textbox search
toggleImageVisibility(product: IProduct) {
  product.imageVisible = !product.imageVisible;
}
set setter(value: string) {
  this.setterValue = value;
  // Ẩn/hiện hình ảnh dựa trên giá trị của setterValue và trạng thái imageVisible
  this.productss.forEach(p => {
    p.imageUrl = p.imageUrl.includes(this.setterValue) && p.imageVisible ? p.imageUrl : '';
  });
}



}
