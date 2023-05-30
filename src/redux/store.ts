import { configureStore } from '@reduxjs/toolkit';
import filter from './slice/filterSlice';
import cart from './slice/cartSlice';
import pizza from './slice/pizzaSlice';
import { useDispatch } from 'react-redux'


export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); 