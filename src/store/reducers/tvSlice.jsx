import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const tvSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {
        loadtv: (state, actions) => {
            state.value = actions.payload;
        },
        removetv: (state, actions) => {
            state.value = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loadtv, removetv } = tvSlice.actions

export default tvSlice.reducer