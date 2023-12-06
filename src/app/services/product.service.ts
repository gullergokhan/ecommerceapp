import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDataType } from '../interfaces/product';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductsByCategory(category: string) {
    throw new Error('Method not implemented.');
  }
  private BASE_URL: string;

  constructor(private _http: HttpClient) {
    this.BASE_URL = environment.BASE_URL;
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  createProduct(productData: ProductDataType): Observable<Product> {
    return this._http.post<Product>(`${this.BASE_URL}/products`, productData);
  }

  deleteProduct(id: number): Observable<Product> {
    return this._http.delete<Product>(`${this.BASE_URL}/products/${id}`);
  }

  updateProduct(productData: ProductDataType, id: number): Observable<Product> {
    return this._http.patch<Product>(
      `${this.BASE_URL}/products/${id}`,
      productData
    );
  }

  getCategoryProducts(categoryName: string): Observable<Product[]> {
    return this._http.get<Product[]>(
      `${this.BASE_URL}/products/category/${categoryName}`
    );
  }

  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }

  // Getting all categories from fake store APIs
  getCategories(): Observable<string[]> {
    return this._http.get<string[]>(`${this.BASE_URL}/products/categories`);
  }

  

}
