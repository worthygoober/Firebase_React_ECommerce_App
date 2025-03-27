import { Timestamp, FieldValue} from "firebase/firestore";

export interface User {
    uid: string;
    displayName: string;
    email: string;
    address?: string;
    createdAt: Timestamp | FieldValue;
}

export interface Product {
    id?: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    createAt: Timestamp | FieldValue;
    updateAt: Timestamp | FieldValue;
    quantity: number;
}

export type Category = string;