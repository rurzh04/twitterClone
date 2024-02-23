import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tweet, ResponseTweet } from './state';

export const tweetsApi = createApi({
    reducerPath: 'tweetsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/tweets',
        prepareHeaders: (headers) => {
            const token = window.localStorage.getItem('token');

            if (token) {
                headers.set('token', `${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Twit'],
    endpoints: (builder) => ({
        getTwitters: builder.query<ResponseTweet<Tweet[]>, []>({
            query: () => ({
                url: '/',
            }),
            providesTags: (result) =>
                result ? [{ type: 'Twit', id: 'ALL' }] : [],
            transformResponse: (
                tweetResult: Promise<ResponseTweet<Tweet[]>>
            ) => {
                return tweetResult.data;
            },
        }),
        getTwitterID: builder.query<ResponseTweet<Tweet>, []>({
            query: (id) => `/${id}`,
            transformResponse: (tweetID: Promise<Tweet[]>) => {
                return tweetID.data;
            },
            providesTags: (result, error, id) => [{ type: 'Twit', id }],
        }),
        createPost: builder.mutation({
            query: (twit) => ({
                url: '/',
                method: 'POST',
                body: twit,
            }),
            invalidatesTags: ['Twit'],
        }),
        deleteTweet: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Twit'],
        }),
    }),
});

export const {
    useGetTwittersQuery,
    useGetTwitterIDQuery,
    useCreatePostMutation,
    useDeleteTweetMutation,
} = tweetsApi;
