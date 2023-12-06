import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ProductDetailsCardComponent } from '../product-details-card/product-details-card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SharedModule,LoadingSpinnerComponent,ProductDetailsCardComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isLoading = true;

    const productId = Number(
      this.activatedRoute.snapshot.paramMap.get('productId')
    );
    // console.log(productId);

    if (productId) {
      this.productService.getProduct(productId).subscribe(
        (product) => {
          this.product = product;
          this.isLoading = false;
          console.log(this.product);
        },
        (err) => {
          this.isError = true;
          this.isLoading = false;
          console.log(err);
        }
      );
    }
  }

 
}