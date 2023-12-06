export interface BasketItem {
    name: string;
    price: number;
    quantity: number;
    id: number;
  }
  
  export interface Basket {
    items: Array<BasketItem>;
  }
  