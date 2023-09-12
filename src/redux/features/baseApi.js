import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_server_url}` }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `/posts?page=${page}&size=10`,
    }),
    getPostsByEmail: builder.query({
      query: (postByEmail) => `/posts-by-email?email=${postByEmail}`,
    }),
    getUser: builder.query({
      query: ({ email }) => `user/${email}`,
    }),
    postData: builder.mutation({
      query: (postBody) => ({
        url: "/post",
        method: "POST",
        body: postBody,
      }),
    }),
  }),
});
export default baseApi;

export const {
  useLazyGetPostsQuery,
  usePostDataMutation,
  useGetPostsByEmailQuery,
} = baseApi;
