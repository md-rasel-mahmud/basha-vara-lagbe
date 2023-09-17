import baseApi from "../api/baseApi";

const userService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostsByEmail: builder.query({
      query: (postByEmail) => `/post/user?email=${postByEmail}`,
      providesTags: ["Post"],
    }),
    getUser: builder.query({
      query: (email) => `user?email=${email}`,
      providesTags: ["User"],
    }),
    getAllUser: builder.query({
      query: () => `user?allUsers`,
      providesTags: ["User"],
    }),

    postUser: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
    }),
  }),
});
export const {
  useGetPostsByEmailQuery,
  useGetUserQuery,
  usePostUserMutation,
  useGetAllUserQuery,
} = userService;
