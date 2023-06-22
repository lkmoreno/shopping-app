import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    price: 0,
    images: '',
    title: '',
    category:'',
    description:''
  }
  @Output() addedProduct = new EventEmitter<Product>();

  onAddToCart() {
    this.addedProduct.emit(this.product)
    console.log('product 1',this.product)
  }

}
