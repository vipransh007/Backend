import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    status : false,
    userData: null,
    initialState,
    reducers: {
        login: (state , action) => {
            state.status = true;
            state.userData = action.payload;
        }
        , logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;