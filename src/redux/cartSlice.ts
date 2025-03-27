import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";
import { Product } from "../types/types";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState ={
    items: [],
    status: 'idle'
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId, { rejectWithValue }) => {
        try {
            const cartSnap = await getDoc(doc(db, 'carts', userId));
            if (cartSnap.exists()) {
                return cartSnap.data().items;
            }
            return [];
        } catch (error) {
            return rejectWithValue('Failed to fetch cart');
        }
    }
);