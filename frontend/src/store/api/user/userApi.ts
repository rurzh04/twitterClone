import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse, RegisterI, ResponseApi, UserI } from './state';
import { setUser } from '../../redux/userSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888',
    }),
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: '/users/me',
                headers: { token: window.localStorage.getItem('token') },
            }),
            transformResponse: (userResult: Promise<ResponseApi<UserI[]>>) => {
                return userResult.data;
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        getMeUser: builder.query({
            query: () => ({
                url: '/users',
            }),
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            transformResponse: (userResult: Promise<ResponseApi<UserI[]>>) => {
                window.localStorage.setItem('token', userResult?.data.token);
                return userResult.success;
            },
        }),
        registerUser: builder.mutation<IGenericResponse, RegisterI>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
            transformResponse: (
                userResult: Promise<ResponseApi<RegisterI[]>>
            ) => {
                return userResult.success;
            },
        }),
        uploadImage: builder.mutation({
            query: (file) => {
                const body = new FormData();
                body.append('Content-Type', 'multipart/form-data');
                body.append('image', file);

                return {
                    url: `/upload`,
                    method: 'POST',
                    body,
                };
            },
            transformResponse: (userResult) => {
                return userResult.url;
            },
        }),
    }),
});

export const {
    useGetMeUserQuery,
    useGetMeQuery,
    useRegisterUserMutation,
    useSignInMutation,
    useUploadImageMutation,
} = userApi;
