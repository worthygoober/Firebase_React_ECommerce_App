import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";
import { CartItem } from "../types/types";
import { RootState } from "./store";

interface CartState {
    items: CartItem[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState ={
    items: [],
    status: 'idle'
};

export const fetchCart = createAsyncThunk<CartItem[], string>(
    'cart/fetchCart',
    async (userId, { rejectWithValue }) => {
        try {
            const cartSnap = await getDoc(doc(db, 'carts', userId));
            if (cartSnap.exists()) {
                return cartSnap.data().items as CartItem[];
            }
            return [];
        } catch (error) {
            return rejectWithValue('Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk<CartItem[], { userId: string; item: CartItem }>(
    'cart/addToCart',
    async ({ userId, item }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const existingItem = state.cart.items.find((item) => item.id === item.id);
            const updatedCart = existingItem ?
                state.cart.items.map((item) => item.id === item.id ? { ...item, quantity: item.quantity + 1} : item
                ) : [...state.cart.items, { ...item, quantity: 1 }];

            await setDoc(doc(db, 'carts', userId), { items: updatedCart });

            return updatedCart;
        } catch (error) {
            return rejectWithValue('Failed to add to cart');
        }
    }
);

export const updateQuantity = createAsyncThunk<CartItem[], { userId: string; id: string; quantity: number }>(
    'cart/updateQuantity',
    async ({ userId, id, quantity}, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const updatedCart = state.cart.items.map((item) => item.id === id ? { ...item, quantity } : item
            );

            await setDoc(doc(db, 'carts', userId), { items: updatedCart });
            
            return updatedCart;
        } catch (error) {
            return rejectWithValue('Failed to update quantity');
        }
    }
);

export const removeFromCart = createAsyncThunk<CartItem[], { userId: string; id: string }>(
    'cart/removeFromCart',
    async ({ userId, id }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const updatedCart = state.cart.items.filter((item) => item.id !== id);

            await setDoc(doc(db, 'carts', userId), { items: updatedCart });
            
            return updatedCart;
        } catch (error) {
            return rejectWithValue('Failed to remove item from cart');
        }
    }
);

export const clearCart = createAsyncThunk<void, { userId: string }>(
    'cart/clearCart',
    async ({ userId }, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, 'carts', userId));
        } catch (error) {
            return rejectWithValue('Failed to clear cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state: CartState) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state: CartState, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state: CartState) => {
                state.status = 'failed';
            })
            .addCase(addToCart.fulfilled, (state: CartState, action) => {
                state.items = action.payload;
            })
            .addCase(updateQuantity.fulfilled, (state: CartState, action) => {
                state.items = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state: CartState, action) => {
                state.items = action.payload;
            })
            .addCase(clearCart.fulfilled, (state: CartState) => {
                state.items = [];
            })
    },
});

export default cartSlice.reducer;