import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
    ingredientsOfPizza:[],
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

export const {filterIngredients} = ingredientSlice.actions;

export default ingredientSlice.reducer;