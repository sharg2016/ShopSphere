import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../components/ProductCard";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existing = state.items.find(
                (i) => i.productId === action.payload.productId
            );
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((i) => i.productId !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
            const { productId, quantity } = action.payload;
            if (quantity <= 0) {
                state.items = state.items.filter((i) => i.productId !== productId);
            }
            else {
                const item = state.items.find((i) => i.productId === productId);
                if (item) {
                    item.quantity = quantity;
                }
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;