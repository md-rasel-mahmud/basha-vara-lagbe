import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_server_url}` }),
  tagTypes: ["Post", "User"],
  endpoints: () => ({}),
});
export default baseApi;
