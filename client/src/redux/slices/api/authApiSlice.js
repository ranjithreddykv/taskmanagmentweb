import { apiSlice } from "../apiSlice.js";

const AUTH_URL = "/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        body: data,
        method: "POST",
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        credentials: "include",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation ,useLogoutMutation} = authApiSlice;
