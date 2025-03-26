import { Timestamp, FieldValue} from "firebase/firestore";

export interface User {
    uid: string;
    displayName: string;
    email: string;
    address?: string;
    createdAt: Timestamp | FieldValue;
}