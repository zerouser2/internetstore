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
        }
    },
    reducers: {
        setRegAuthDatas(state, action) {
            state.regDatas = action.payload
        },
        setLogAuthDatas(state, action) {
            state.logDatas = action.payload
        }
    },
})


export const { setRegAuthDatas, setLogAuthDatas } = Auth.actions


export default Auth.reducer