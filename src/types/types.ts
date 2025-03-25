import { Timestamp, FieldValue} from "firebase/firestore";

export interface User {
    uid: string;
    name: string;
    email: string;
    address?: string;
    createdAt: Timestamp | FieldValue;
}