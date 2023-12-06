import { createAction, createReducer, on, props } from "@ngrx/store";
import { BasketModel } from "src/app/interfaces/basket";
import * as BasketActions from "./baskets.action";


export const initialState: BasketModel[] = [];

export const BasketsReducer = createReducer(
  initialState,
  on(BasketActions.addBasket, (state, { basket }) => {
    return [...state, basket];
  }),
  // Diğer eylemler buraya eklenebilir
);