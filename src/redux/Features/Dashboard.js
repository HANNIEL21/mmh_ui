// adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    doctors: [],
    nurses: [],
    payments: [],
    records: [],
    isLoading: true,
    error: null,
};

export const dashboardSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearState: (state) => {
            state.patients = [];
            state.doctors = [];
            state.nurses = [];
            state.payments = [];
            state.records = [];
            return state;
        },
        setPatients: (state, { payload }) => {
            state.patients = payload;
        },
        setDoctors: (state, { payload }) => {
            state.doctors = payload;
        },
        setNurses: (state, { payload }) => {
            state.nurses = payload;
        },
        setPayments: (state, { payload }) => {
            state.payments = payload;
        },
        setRecords: (state, { payload }) => {
            state.records = payload;
        },
        isLoadingTrue: (state) => {
            state.isLoading = true;
        },
        isLoadingFalse: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    setDoctors,
    setNurses,
    setPatients,
    setPayments,
    setRecords,
    isLoadingFalse,
    isLoadingTrue
} = dashboardSlice.actions;


export default dashboardSlice.reducer;