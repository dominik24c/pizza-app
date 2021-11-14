import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzas: [],
    ingredients: [],
    status: '',
    isShowPizzaDetail: false,
    selectedPizza: null
};

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async()=>{
        return fetch(`${URL}/pizza`,{method:'GET'}).then(response=>response.json());
    }
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers:{
        showPizzaDetail: (state,action)=>{
            console.log(action.payload);
            const pizzaId = action.payload;
            state.selectedPizza = state.pizzas.find(pizza=> pizza.id===pizzaId);
            state.isShowPizzaDetail=true;
        }
    },
    extraReducers:{
        [fetchPizzas.pending]:(state,action)=>{
            state.status ='loading'
        },
        [fetchPizzas.fulfilled]:(state,action)=>{
            state.pizzas = action.payload
            state.status= 'success'
        },
        [fetchPizzas.rejected]:(state,action)=>{
            state.status= 'failed'
        }
    }
})

export const {showPizzaDetail} = pizzaSlice.actions;

export default pizzaSlice.reducer;