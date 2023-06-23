import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { zip } from 'rxjs';
import { checkTime} from '../interceptors/time.interceptor'
import { Product, CreateProductDTO, updateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context:checkTime() })
      .pipe(
        retry(3)
      );
  }

  fetchReadAndUpdate(id: string, dto: updateProductDTO) {
    return zip(
      this.getProductById(id),
      this.update(id, dto)
    );
  }

  getAllProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset } , context:checkTime()
    });
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 500:
              throw 'Algo esta fallando en el server';
              break;
            case 404:
              throw 'El producto no existe';
              break;
            default:
              throw "Ups algo salio mal";
          }
        })
      )
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, dto: updateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
