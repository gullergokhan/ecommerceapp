import { Component, Input, inject } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Store } from '@ngrx/store';
import { BasketModel } from 'src/app/interfaces/basket';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { addBasket } from 'src/app/state/baskets/baskets.action';
import { Stores } from 'src/app/state/stores';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-product-details-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-details-card.component.html',
  styleUrls: ['./product-details-card.component.scss']
})
export class ProductDetailsCardComponent {
  @Input() product: Product;
  productQuantity: number = 1;
  private basketService = inject(BasketService);


  // constructor(private store: Store<Stores["baskets"]>) {
  //   this.product = {} as Product;
    
  // }
  constructor() {
    this.product = {} as Product; 
  }
  
  // addBasket(product: Product) {
  //   let basketModel = new BasketModel();
  //   basketModel.productId = product.id;
  //   basketModel.quantity = 1;
  
  //   console.log("Basket to be added:", basketModel); // Kontrol için log
  //   this.store.dispatch(addBasket({ basket: basketModel }));
  // }
  increaseProductQuantity() {
    this.productQuantity++;
  }
  decreaseProductQuantity() {
    if (this.productQuantity > 1) this.productQuantity--;
  }

  get totalPrice() {
    return this.product.price * this.productQuantity;
  }

  get reviewText() {
    const reviewCount = this.product.rating.count;

    if (reviewCount === 0) return 'No reviews';
    else if (reviewCount === 1) return '1 review';
    else if (reviewCount > 1) {
      return `${reviewCount} reviews`;
    }
    return '';
  }
  
  onAddToCart() {
    
    this.basketService.addToCart({
      name: this.product.title,
      price: this.product.price,
      quantity:this.productQuantity, 
      id: this.product.id,
   
  })
}
}
