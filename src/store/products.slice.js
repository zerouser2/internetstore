import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { act } from "react";




export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://fakestoreapi.com/products')

            if (!response.ok) {
                throw new Error('Server error!')
            }

            const data = await response.json()

            return data
            
        } catch (error) {   
            return rejectWithValue(error.message)
        }
    }
)


const Products = createSlice({
    name: 'products',
    initialState: {
        products: [],
        currentItems: [],
        error: null,
        status: null,
        showAll: false,
        isActiveModalCart: false,
        isActiveModalBuy: false,
        currentProduct: [],
        basket: [],
    },
    reducers: {
        showAllProducts(state, action) {
            state.showAll = action.payload
        },
        setCurrentItems(state, action) {
            if (action.payload === 'all') {
                state.currentItems = state.products;
            } else {
                state.currentItems = state.products.filter(el => el.category === action.payload);
            }   
        },
        setActiveModalCart(state, action) {
            state.isActiveModalCart = action.payload.isActive
            if (action.payload.product) {
                state.basket.push(action.payload.product)
            }
        },
        setActiveModalBuy(state, action) {
            state.isActiveModalBuy = action.payload.isActive
            state.currentProduct[0] = {product: action.payload.product}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.currentItems = action.payload; 
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
})

export const { showAllProducts, selectProduct, selectCategory, setCurrentItems, setActiveModalCart, setActiveModalBuy } = Products.actions
export default Products.reducer