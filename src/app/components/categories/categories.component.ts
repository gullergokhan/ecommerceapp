import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { Product } from 'src/app/models/product.model';
import { SliderService } from 'src/app/services/slider.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import * as Aos from 'aos';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule,LoadingSpinnerComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  productsByCategory: Product[] = [];
  defaultCategoryProducts: Product[] = [];
  isLoading: boolean = false;

  constructor(private sliderService: SliderService) {}

  ngOnInit() {
    Aos.init();
  
    this.isLoading = true;
    this.sliderService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      if (this.categories.length > 0) {
        this.loadProductsByCategory(this.categories[0]); 
      }
      this.isLoading = false;
    });
  }

  loadProductsByCategory(category: string) {
    this.isLoading = true; 
  
    this.sliderService.getProductsByCategory(category).subscribe(products => {
      this.productsByCategory = products;
      // console.log(this.productsByCategory);
      
      
      this.isLoading = false; 
    });
  }
  
}