// adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appointments: [],
    patients: [],
    doctors: [],
    staffs: [],
    results: [],
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
            state.appointments = [];
            state.patients = [];
            state.doctors = [];
            state.staffs = [];
            state.results = [];
            state.payments = [];
            state.records = [];
            return state;
        },
        setAppointments: (state, { payload }) => {
            state.appointments = payload;
        },
        setPatients: (state, { payload }) => {
            state.patients = payload;
        },
        setDoctors: (state, { payload }) => {
            state.doctors = payload;
        },
        setStaffs: (state, { payload }) => {
            state.staffs = payload;
        },
        setResults: (state, { payload }) => {
            state.results = payload;
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
    setAppointments,
    setDoctors,
    setStaffs,
    setResults,
    setPatients,
    setPayments,
    setRecords,
    isLoadingFalse,
    isLoadingTrue
} = dashboardSlice.actions;


export default dashboardSlice.reducer;