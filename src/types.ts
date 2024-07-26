// src/types.ts

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

export interface RootState {
    cart: CartState;
}
