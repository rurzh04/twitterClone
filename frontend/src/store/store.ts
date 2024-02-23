import { configureStore } from '@reduxjs/toolkit';

import { tweetsApi } from './api/tweets/tweetsApi';
import { userApi } from './api/user/userApi';
import userReducer from './redux/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action,
        });
    }
    return next(action);
};

export const store = configureStore({
    reducer: {
        [tweetsApi.reducerPath]: tweetsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        userSlice: userReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            stringMiddleware,
            userApi.middleware,
            tweetsApi.middleware,
        ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
