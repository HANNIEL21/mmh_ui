import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: {
        email: "",
        password: "",
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.auth.email = action.payload;
        },
        setPassword: (state, action) => {
            state.auth.password = action.payload;
        },
        setLoadingTrue: (state) => {
            state.isLoading = true;
        },
        setLoadingFalse: (state) => {
            state.isLoading = false;
        },
        setError: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
        clearAuthState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.auth = {
                email: "",
                password: "",
            };
        },
    },
});

export const { setEmail, setPassword, clearAuthState, setLoadingTrue, setLoadingFalse, logout, setError } = authSlice.actions;

export default authSlice.reducer;