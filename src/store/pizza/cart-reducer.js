import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    pizzas:[],
    sauces:[],
    totalPrice: 0
}



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addPizza: (state,action)=>{
            const pizza = action.payload;
            const pizzaIndex = state.pizzas.findIndex(p=>p.id===pizza.id);
            if(pizzaIndex===-1){
                state.pizzas = [...state.pizzas,{...pizza, totalAmount:1}]
            }else{
                state.pizzas[pizzaIndex].totalAmount+=1;
            }
            state.totalPrice += pizza.price;
        },
        addPizzaById:(state,action)=>{
            const pizzaId = action.payload;
            const pizzaIndex = state.pizzas.findIndex(p=>p.id===pizzaId);
            if(pizzaIndex!==-1){
                state.pizzas[pizzaIndex].totalAmount+=1;
                state.totalPrice += state.pizzas[pizzaIndex].price;    
            }
        },
        deletePizzaById: (state,action)=>{
            const pizzaId = action.payload;
            const pizza = state.pizzas.find(p=>p.id===pizzaId);
            if(pizza.totalAmount>1){
                pizza.totalAmount-=1;
            }else{
                state.pizzas = state.pizzas.filter(p=>p.id !== pizzaId);
            }
            state.totalPrice -= pizza.price;
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

        },
        addSauceById: (state,action)=>{
            const sauceId = action.payload;
            const sauceIndex = state.sauces.findIndex(s=>s.id===sauceId);
            if(sauceIndex!==-1){
                state.sauces[sauceIndex].totalAmount+=1;
                state.totalPrice += state.sauces[sauceIndex].price;    
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
        }
    },
    extraReducers:{}
})

export const {addPizza,deletePizzaById,addPizzaById,
    addSauce,addSauceById,deleteSauceById} = cartSlice.actions;

export default cartSlice.reducer;