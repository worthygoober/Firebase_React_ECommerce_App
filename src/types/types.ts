import { Timestamp, FieldValue} from "firebase/firestore";

export interface User {
    uid: string;
    displayName: string;
    email: string;
    address?: string;
    createdAt: Timestamp | FieldValue;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    totalPrice: number;
    createdAt: Timestamp | FieldValue;
    items: { 
        id: string;
        title: string;
        quantity: number;
        price: number
    }[];
}

export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

export type Category = string;