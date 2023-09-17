import baseApi from "../api/baseApi";

const postServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `/post?page=${page}&size=10`,
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
export const { useLazyGetPostsQuery, usePostDataMutation } = postServices;
export default postServices;
