import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {
        id: '',
        nameCompany: '',
        adress: '',
        needFactire: false,
        pits: [{ name: '', count: '' }],
        meet: '',
        additives: [{ name: '', count: '' }],
        price: '',
        isDone: false
    }
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders(state, action) {
            state.order = action.payload;
        },
    },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;