import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import { addPizzaHandler, comparePizzas, deletePizzaByIdHandler, addPizzaWithChangedIngredientsHandler } from "./cart-utils";

const initialState ={
    pizzas:[],
    pizzasWithChangedIngredients:[],
    sauces:[],
    totalPrice: 0,
    totalAmount: 0,
    status:'',
    successMessage:'',
    errorMessage:''
}

export const orderPizza = createAsyncThunk(
    'cart/orderPizza',
    async(arg,{getState,extra})=>{
        const state = getState().cart;
        const mergePizzas = [...state.pizzas,...state.pizzasWithChangedIngredients];
        const pizzas = mergePizzas.map(p=>{
            const idIngredientsArr = p.ingredients.map(i=>{
                if(i instanceof Object){
                    return i.id;
                }else{
                    return i;
                }
            });
            return {id: p.id, ingredients: idIngredientsArr};
        });

        const data = {
            pizza: pizzas,
            total: state.totalPrice
        };

        if(state.sauces.length>0){
            data.sauce = state.sauces.map(s=>{
                return {id:s.id, count:s.totalAmount}
            })
        }
        console.log(JSON.stringify(data));
        return fetch(`${URL}/order`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
    }
)

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addPizza: (state,action)=>{
            const pizza = action.payload;
            addPizzaHandler(state,pizza);
            state.totalPrice += pizza.price;
            state.totalAmount += 1;
        },
        addPizzaWithChangedIngredients: (state,action)=>{
            const pizza = action.payload.pizzaObj;
            const orginalPizzasArr = action.payload.orginalPizzas;

            const searchedPizza = orginalPizzasArr.find(p=>p.id===pizza.id);            
            const ingredientsOfPizza = pizza.ingredients.filter(p => {
                return searchedPizza.ingredients.includes(p.id)
            });

            let isNotEditedPizza = false;
            console.log('length '+ingredientsOfPizza.length  +" "+ pizza.ingredients.length)
            if(ingredientsOfPizza.length === searchedPizza.ingredients.length &&
                pizza.ingredients.length === searchedPizza.ingredients.length){
                isNotEditedPizza = true;
            }

            let isInPizzasWithChangedIngredients = -1;
            if(!isNotEditedPizza){
                const searchedPizzas = state.pizzasWithChangedIngredients.filter(p=>p.id===pizza.id);
                isInPizzasWithChangedIngredients = comparePizzas(pizza,searchedPizzas);
            }

            if(isNotEditedPizza){
                console.log('add pizza')
                addPizzaHandler(state,pizza);
            }else if (isInPizzasWithChangedIngredients!==-1){
                console.log('add next pizza')
                addPizzaWithChangedIngredientsHandler(state,pizza,isInPizzasWithChangedIngredients);
            }else{
                console.log('add new pizza generated')
                const key=uuidv4();
                state.pizzasWithChangedIngredients.push({...pizza, key:key, totalAmount:1})
            }
            state.totalPrice += pizza.price;
            state.totalAmount += 1;
        },
        
        addPizzaById:(state,action)=>{
            const pizzaId = action.payload;
            const pizzaIndex = state.pizzas.findIndex(p=>p.key===pizzaId);
            if(pizzaIndex!==-1){
                state.pizzas[pizzaIndex].totalAmount+=1;
                state.totalPrice += state.pizzas[pizzaIndex].price;   
                state.totalAmount += 1;
            }else{
                const pIndex = state.pizzasWithChangedIngredients.findIndex(p=>p.key===pizzaId);
                if(pIndex!==-1){
                    state.pizzasWithChangedIngredients[pIndex].totalAmount+=1;
                    state.totalPrice += state.pizzasWithChangedIngredients[pIndex].price;   
                    state.totalAmount += 1;
                }
            }
        },
        deletePizzaById: (state,action)=>{
            const pizzaId = action.payload;
        
            let pizzaObj = deletePizzaByIdHandler(state.pizzas,pizzaId);
            if(pizzaObj.pizza){
                state.pizzas = pizzaObj.pizzasArr;
            }else{
                pizzaObj = deletePizzaByIdHandler(state.pizzasWithChangedIngredients,pizzaId);
                state.pizzasWithChangedIngredients = pizzaObj.pizzasArr;
            }
            state.totalPrice -= pizzaObj.pizza.price;
            state.totalAmount -= 1;
        },

        addSauce: (state,action)=>{
            const sauce = action.payload;
            const sauceIndex = state.sauces.findIndex(s=>s.id===sauce.id)
            if(sauceIndex===-1){
                state.sauces = [...state.sauces,{...sauce, totalAmount:1}]
            }else{
                state.sauces[sauceIndex].totalAmount+=1;
            }
            state.totalPrice += sauce.price;
            state.totalAmount += 1;

        },

        addSauceById: (state,action)=>{
            const sauceId = action.payload;
            const sauceIndex = state.sauces.findIndex(s=>s.id===sauceId);
            if(sauceIndex!==-1){
                state.sauces[sauceIndex].totalAmount+=1;
                state.totalPrice += state.sauces[sauceIndex].price; 
                state.totalAmount += 1;   
            }
        },
        deleteSauceById: (state,action)=>{
            const sauceId = action.payload;
            const sauce = state.sauces.find(s=>s.id===sauceId);
            if(sauce.totalAmount>1){
                sauce.totalAmount-=1;
            }else{
                state.sauces = state.sauces.filter(s=>s.id !== sauceId);
            }
            state.totalPrice -= sauce.price;
            state.totalAmount -= 1;
        },
        resetCart: (state,action)=>{
            state.pizzas=[];
            state.pizzasWithChangedIngredients=[];
            state.sauces=[];
            state.totalPrice= 0;
            state.totalAmount = 0;
            state.status = '';
        },
        resetMessages:(state,action)=>{
            state.successMessage = '';
        }
    },
    extraReducers:{
        [orderPizza.pending]: (state,action)=>{
            state.status = 'sending';
        },
        [orderPizza.fulfilled]: (state,action)=>{
            console.log(action.payload);
            state.successMessage = action.payload;
            state.status = 'success';
        },
        [orderPizza.rejected]: (state,action)=>{
            state.errorMessage = action.payload;
            state.status = 'failed';
        }
    }
})

export const {
    addPizza,
    addPizzaWithChangedIngredients,
    deletePizzaById,
    addPizzaById,
    addSauce,
    addSauceById,
    deleteSauceById,
    resetCart,
    resetMessages
} = cartSlice.actions;

export default cartSlice.reducer;