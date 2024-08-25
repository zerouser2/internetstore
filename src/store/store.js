import { configureStore } from "@reduxjs/toolkit";
import productSlice from './products.slice'
import authSlice from "./auth.slice";

export default configureStore({
    reducer: {
        products: productSlice,
        auth: authSlice,
    },
})