import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators'
import { Product, CreateProductDTO, updateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService, } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'initial' = 'initial';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadData()
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProductById(id)
      .subscribe({
        next: (data) => {
          this.toggleProductDetail();
          this.productChosen = data;
          this.statusDetail = 'success';
        },
        error: (error) => {
          window.alert(error)
          console.log('error', error);
          this.statusDetail = 'error';
        }
      })
  }

  readAndUpdateProduct(id: string){
    this.productsService.getProductById(id).pipe(
      switchMap((product)=>{
        return  this.productsService.update(product.id,{title:'el nuevo titulo'})
      }))
    .subscribe(data =>{
      console.log(data)
    })
  }

  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(newProduct).subscribe(data => {
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const changes: updateProductDTO = {
      title: 'nuevo producto!',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.toggleProductDetail();
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadData() {
    this.productsService.getAllProductsByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit
      });
  }

}
