import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { Product } from 'src/app/models/product.model';
import { SliderService } from 'src/app/services/slider.service';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  randomProducts: Product[] = [];

  constructor(private sliderService: SliderService) {}

  ngOnInit() {
    this.getElectronicsProducts();
  }

  getElectronicsProducts() {
    this.sliderService.getProductsByCategory('jewelery').subscribe(
      (products: Product[]) => {
        
        this.randomProducts = products.slice(0, 3);
      },
      (error) => {
        console.error('Ürünler alınırken bir hata oluştu:', error);
      }
    );
  }
}
 
