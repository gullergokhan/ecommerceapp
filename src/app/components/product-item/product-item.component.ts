import { Component, Input, inject } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { Product } from 'src/app/interfaces/product';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product;
  private basketService = inject(BasketService);

  constructor() {
    this.product = {} as Product; 
  }
  onAddToCart() {
    
      this.basketService.addToCart({
        name: this.product.title,
        price: this.product.price,
        quantity: 1,
        id: this.product.id,
     
    })
  }
}