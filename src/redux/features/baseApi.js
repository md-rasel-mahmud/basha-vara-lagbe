import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page }) => `/posts?page=${page}&size=10`,
    }),
    getUser: builder.query({
      query: ({ email }) => `/${email}`,
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

export const { useGetPostsQuery, usePostDataMutation } = baseApi;
