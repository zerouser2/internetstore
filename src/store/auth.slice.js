import { createSlice } from "@reduxjs/toolkit"

const Auth = createSlice({
    name: 'auth',
    initialState: {
        regDatas: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        logDatas: {
            email: '',
            password: ''
        },
        description: ''
    },
    reducers: {
        setRegAuthDatas(state, action) {
            state.regDatas = action.payload
        },
        setLogAuthDatas(state, action) {
            state.logDatas = action.payload
        },
        setDescription(state, action) {
            state.description = action.payload
        }
    },
})


export const { setRegAuthDatas, setLogAuthDatas, setDescription } = Auth.actions


export default Auth.reducer