import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const personSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        loadperson: (state, actions) => {
            state.value = actions.payload;
        },
        removeperson: (state, actions) => {
            state.value = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loadperson, removeperson } = personSlice.actions

export default personSlice.reducer