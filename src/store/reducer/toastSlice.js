import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isToast: false,
    toastText: ""
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        // Toastni ko'rsatish yoki yashirish
        setToastVisibility(state, action) {
            state.isToast = action.payload.isToast;
        },
        // Toast matnini o'rnatish
        setToastText(state, action) {
            state.toastText = action.payload.toastText;
        },
        // Toastni tozalash (yo'q qilish)
        clearToast(state) {
            state.isToast = false;
            state.toastText = "";
        }
    },
});

export const { setToastVisibility, setToastText, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
