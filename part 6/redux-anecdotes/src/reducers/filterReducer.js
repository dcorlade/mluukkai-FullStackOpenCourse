import { createSlice } from "@reduxjs/toolkit"

const fitlerSlice = createSlice({
    name:"filter",
    initialState: '',
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})

export const { setFilter } = fitlerSlice.actions
export default fitlerSlice.reducer