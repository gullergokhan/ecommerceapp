import { createAction, props } from "@ngrx/store";
import { BasketModel } from "src/app/interfaces/basket";

export const addBasket = createAction(
    "[Basket] Add Count", props<{ basket: BasketModel }>()
    );
