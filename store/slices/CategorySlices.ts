import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CategoryState = {
    brands: string[],
    facilities: string[]
    gas: string[]
}

const initialCategory:CategoryState = {
    brands: [],
    facilities: [],
    gas: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState: initialCategory,
    reducers: {
        addCategories(state:CategoryState, action:PayloadAction<{key:keyof CategoryState, value:string}>){
            const {key, value} = action.payload;
            if(!state[key].includes(value)){
                state[key].push(value);
            }
            console.log(state);
        },
        deleteCategories(state:CategoryState, action: PayloadAction<{key:keyof CategoryState, value:string}>){
            const {key, value} = action.payload;
            state[key] = state[key].filter((item)=>item!==value);
        },
        resetCategories(state:CategoryState){
            state.brands=[];
            state.facilities=[];
            state.gas=[]
        }
    }
})

export const {addCategories, deleteCategories, resetCategories} = categorySlice.actions;
export default categorySlice.reducer;