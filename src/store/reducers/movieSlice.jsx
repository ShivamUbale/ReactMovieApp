import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}


export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        loadmovie: (state, action) => {
            state.value = action.payload;

        },
        removemovie: (state, action) => {
            state.value = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loadmovie, removemovie } = movieSlice.actions

export default movieSlice.reducer