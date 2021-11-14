import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSauces =  createAsyncThunk(
    'sauce/fetchSauces',
    async()=>{
        return fetch(`${URL}/sauce`)
        .then(response=>response.json());
    }
)

const initialState = {
    sauces: [],
    status: ''
}

const sauceSlice = createSlice({
    name: 'sauce',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchSauces.loading]: (state,action)=>{
            state.status = 'loading';
        },
        [fetchSauces.fulfilled]: (state,action)=>{
            state.sauces = action.payload
            state.status = 'success';
        },
        [fetchSauces.rejected]: (state,action)=>{
            state.status = 'failed';
        },
    }
});
export default sauceSlice.reducer;