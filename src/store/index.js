import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './reducer/loadingSlice'
import toastSlice from './reducer/toastSlice';

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        toast: toastSlice  // loadingSlice'ni reducer sifatida qo'shamiz
    },
});

export default store;
