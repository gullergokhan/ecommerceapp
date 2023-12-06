import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
 
    basketCount$: Observable<number>;
    @Input() title: string = "";
  
    // constructor(private store: Store<{ basketCount: number }>) {
    //   this.basketCount$ = this.store.select('basketCount');
    // } 
    constructor(private basketService: BasketService) {
      this.basketCount$ = this.basketService.cart.pipe(
        // Sepetteki öğelerin toplam sayısını alır
        map(basket => basket.items.length)
      );
    }
  ngOnInit(): void {}

    
  }

