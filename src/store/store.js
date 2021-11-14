import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./pizza/cart-reducer";
import ingredientReducer from "./pizza/ingredient-reducer";
import pizzaReducer from "./pizza/pizza-reducer";
import sauceReducer from "./pizza/sauce-reducer";

const store = configureStore({
    reducer:{
        pizza: pizzaReducer,
        sauce: sauceReducer,
        ingredient: ingredientReducer,
        cart: cartReducer
    }
})

export default store;