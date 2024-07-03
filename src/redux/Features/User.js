import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        gender: "",
        religion: "",
        age: "",
        occupation: "",
        marital_status: "",
        fnnok: "",
        lnnok: "",
        pnnok: "",
        anok: "",
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: "",
    data: [],
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserState: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.error = "";
            return state;
        },
        setError: (state, { payload }) => {
            state.isError = true;
            state.errorMessage = payload;
        },
        setSuccess: (state) => {
            state.isSuccess = true;
        },
        setID: (state, { payload }) => {
            state.user.id = payload;
        },
        setEmail: (state, { payload }) => {
            state.user.email = payload;
        },
        setFirstName: (state, { payload }) => {
            state.user.firstname = payload;
        },
        setLastName: (state, { payload }) => {
            state.user.lastname = payload;
        },
        setPhone: (state, { payload }) => {
            state.user.phone = payload;
        },
        setAge: (state, { payload }) => {
            state.user.age = payload;
        },
        setGender: (state, { payload }) => {
            state.user.gender = payload;
        },
        setReligion: (state, { payload }) => {
            state.user.religion = payload;
        },
        setOccupation: (state, { payload }) => {
            state.user.occupation = payload;
        },
        setPassword: (state, { payload }) => {
            state.user.password = payload;
        },
        setRole: (state, { payload }) => {
            state.user.role = payload;
        },
        setMaritalStatus: (state, { payload }) => {
            state.user.marital_status = payload;
        },
        setFnnok: (state, { payload }) => {
            state.user.fnnok = payload;
        },
        setLnnok: (state, { payload }) => {
            state.user.lnnok = payload;
        },
        setPnnok: (state, { payload }) => {
            state.user.pnnok = payload;
        },
        setAnok: (state, { payload }) => {
            state.user.anok = payload;
        },
        setData: (state, { payload }) => {
            state.data = payload;
        },
        setIsLoadingTrue: (state) => {
            state.isLoading = true;
        },
        setIsLoadingFalse: (state) => {
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = {
                id: "",
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                password: "",
                role: "",
                gender: "",
                religion: "",
                age: "",
                occupation: "",
                marital_status: "",
                fnnok: "",
                lnnok: "",
                pnnok: "",
                anok: "",
            };
            state.data = [];
            state.token = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.error = "";
        },
    },
});

export const {
    setAge,
    setAnok,
    setData,
    setEmail,
    setError,
    setFirstName,
    setFnnok,
    setGender,
    setID,
    setLastName,
    setLnnok,
    setMaritalStatus,
    setOccupation,
    setPassword,
    setPhone,
    setPnnok,
    setReligion,
    setRole,
    setSuccess,
    setIsLoadingFalse,
    setIsLoadingTrue,
    logout
} = userSlice.actions;

export default userSlice.reducer;
