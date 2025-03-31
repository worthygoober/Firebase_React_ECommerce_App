import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";
import { Product } from "../types/types";

interface ProductState {
    products: Product[];
    selectedCategory: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
    products: [],
    selectedCategory: '',
    status: 'idle',
};

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
    }
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (newProduct: Product) => {
        const { id: _, ...productData } = newProduct;
        const docRef = await addDoc(collection(db, 'products'), newProduct);
        return { id: docRef.id, ...productData } as Product;
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, updates }: { id: string; updates: Partial<Product> }) => {
        const productRef = doc(db, 'products', id);
        await updateDoc( productRef, updates );
        return { id, ...updates };
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id: string) => {
        await deleteDoc(doc(db, 'products', id));
        return id;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state: ProductState) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state: ProductState, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state: ProductState) => {
                state.status = 'failed';
            })
            .addCase(addProduct.fulfilled, (state: ProductState, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state: ProductState, action) => {
                const index = state.products.findIndex((product: Product) => product.id === action.payload.id);
                if (index != -1) {
                    state.products[index] = { ...state.products[index], ...action.payload };
                };
            })
            .addCase(deleteProduct.fulfilled, (state: ProductState, action) => {
                state.products = state.products.filter((product: Product) => product.id !== action.payload);
            })
    },
});

export const { setSelectedCategory} = productSlice.actions;
export default productSlice.reducer;