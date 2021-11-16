import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    ingredients: [], //ingredients from request
    ingredientsOfPizza:[], // ingredients of choosen pizza from menu
    choosenIngredientOfPizza:[], // selected ingredients of pizza by customer
    priceOfPizza: 0, //price is calculated for current pizza with additional ingredients
    status: '',
};

export const fetchIngredients = createAsyncThunk(
    'ingredient/fetchIngredients',
    async()=>{
        return fetch(`${URL}/ingredient`)
                .then(response=>response.json());
    }
)



const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers:{
        filterIngredients: (state,action)=>{
            const ingredientsOfPizza = action.payload;
            state.ingredientsOfPizza= state.ingredients.filter((ingredient)=>{
                return ingredientsOfPizza.includes(ingredient.id);
            });
            state.choosenIngredientOfPizza=[...state.ingredientsOfPizza];
        },
        addIngredient: (state,action)=>{
            const ingredient = action.payload;
            const isIngredientInPizza = state.choosenIngredientOfPizza.find(i=>i.id===ingredient.id);
            if(!isIngredientInPizza){
                state.choosenIngredientOfPizza.push(ingredient);
                state.priceOfPizza += ingredient.price;
                console.log(state.priceOfPizza);
                // state.choosenIngredientOfPizza.map(ing=>console.log(ing.id,ing.name));
                // console.log(state.choosenIngredientOfPizza.length);
            }
        },
        deleteIngredient: (state,action)=>{
            const idOfIngredient = action.payload;
            const ingredient = state.choosenIngredientOfPizza.find(i=>i.id===idOfIngredient);
            if(ingredient){
                state.choosenIngredientOfPizza = state.choosenIngredientOfPizza.filter(i=>i.id!==idOfIngredient);
                state.priceOfPizza -= ingredient.price;
                console.log(state.priceOfPizza);
            }
            // state.choosenIngredientOfPizza.map(ing=>console.log(ing.id,ing.name));
            // console.log(state.choosenIngredientOfPizza.length);
        },
        setPriceOfPizza:(state,action)=>{
            state.priceOfPizza =action.payload;
        }

    },
    extraReducers:{
        [fetchIngredients.pending]:(state,action)=>{
            state.status='loading';
        },
        [fetchIngredients.fulfilled]:(state,action)=>{
            state.ingredients = action.payload;
            state.status='success';
        },
        [fetchIngredients.rejected]:(state,action)=>{
            state.status='failed';
        }
    }
})

export const {filterIngredients, addIngredient,deleteIngredient,setPriceOfPizza} = ingredientSlice.actions;

export default ingredientSlice.reducer;