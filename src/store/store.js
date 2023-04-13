import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "./slices/ordersSlice";

export const store = configureStore({
    reducer: {
        ordersSlice
    },
    devTools: true
});