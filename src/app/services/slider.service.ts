import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, map } from "rxjs";
import { Product } from "../models/product.model";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class SliderService {
  private httpClient = inject(HttpClient);
  categories: Subject<Array<string>> = new Subject<Array<string>>();
  allProducts: Subject<Array<Product>> = new Subject<Array<Product>>();

  constructor() {
    this.httpClient
      .get<Array<string>>(`${STORE_BASE_URL}/products/categories`)
      .subscribe((categories) => {
        this.categories.next(categories);
      });
    this.httpClient
      .get<Array<Product>>(`${STORE_BASE_URL}/products`)
      .pipe(
        map((products) => {
          return products.map((product) => {
            product.onCart = false;
            return product;
          });
        })
      )
      .subscribe((products) => {
        this.allProducts.next(products);
      });
  }

  getAllCategories(): Subject<Array<string>> {
    return this.categories;
  }
  
  getProductsByCategory(category: string): Observable<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(`${STORE_BASE_URL}/products/category/${category}`)
      .pipe(
        map((products) => {
          return products.map((product) => {
            product.onCart = false; 
            return product;
          });
        })
      );
  }

}
