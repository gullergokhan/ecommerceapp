import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Basket, BasketItem } from "../models/basket.model";


@Injectable({
  providedIn: "root",
})
export class BasketService {
  cart = new BehaviorSubject<Basket>({ items: [] });
  constructor() {}

  addToCart(item: BasketItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
  }

  getTotal(items: Array<BasketItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  emptyCart(): void {
    this.cart.next({ items: [] });
  }

  removeFromCart(item: BasketItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    this.cart.next({ items: filteredItems });
  }

  removeQuantity(item: BasketItem): void {
    let itemForRemoval: BasketItem | undefined;
    const filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) _item.quantity--;
      if (_item.quantity === 0) {
        itemForRemoval = _item;
      }
      return _item;
    });

    this.cart.next({ items: filteredItems });
    if (itemForRemoval) {
      this.removeFromCart(itemForRemoval);
    }
  }
}
