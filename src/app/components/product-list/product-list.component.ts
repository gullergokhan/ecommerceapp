import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryProducts } from 'src/app/interfaces/product';
import { Subscription, forkJoin } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import * as Aos from 'aos';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SharedModule,LoadingSpinnerComponent,ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  private categories: string[] = [];
  products: CategoryProducts[] = [];
  filteredProducts: CategoryProducts[] = [];
  private _listFilter = '';
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    
    Aos.init();

    this.isLoading = true;
    const categoriesSubscription = this.productService
      .getCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          // console.log(categories);

         
          const categoryProductRequests = this.categories.map((category) =>
            this.productService.getCategoryProducts(category)
          );

         
          const productsSubscription = forkJoin(
            categoryProductRequests
          ).subscribe((results) => {
            // console.log(results);
            this.products = results.map((products, index) => ({
              categoryName: this.categories[index],
              totalProducts: products.length,
              products,
            }));

            // console.log(this.products);

            this.filteredProducts = this.products;
            this.isLoading = false;
          });

          this.subscriptions.push(productsSubscription);
        },
        error: (err) => {
          this.isError = true;
          this.isLoading = false;
          console.error(err);
        },
      });

    this.subscriptions.push(categoriesSubscription);
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
    // console.log('filteredProducts: ');
    // console.log(this.filteredProducts);
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.map((product) => {
      let products = product.products;
      products = products.filter(
        (product) =>
          product.title.toLocaleLowerCase().includes(filterBy) ||
          product.category.toLocaleLowerCase().includes(filterBy) ||
          product.price.toString().includes(filterBy)
      );

      const filteredProducts: CategoryProducts = {
        ...product,
        totalProducts: products.length,
        products,
      };

      return filteredProducts;
    });
  }

  get isNotFoundProducts() {
    return this.filteredProducts.every(
      (product) => product.totalProducts === 0
    );
  }

  ngOnDestroy(): void {
   
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
