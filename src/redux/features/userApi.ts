import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface UserState {
    data: any,
    isAuthenticated: boolean,
    isLoading: boolean,
  }
interface UserLoginSchema {
    username: string;
    password: string;
}
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7025/api/users/' }),
    endpoints: (builder) => ({
      getAllUsers: builder.query<any, void>({
        // query: (name) => `pokemon/${name}`,
        query: ()=>''
      }),

      loginUser: builder.mutation({
        query: (userForm: UserLoginSchema) => ({
          url: '/login',
          method: 'POST',
          // Include the entire post object as the body of the request
          body: userForm,
          credentials: "include"

        })
      }),

      verifyUser: builder.query<any, void>({
        query: () => ({
          url: '/verify',
          method: 'POST',
          credentials: "include"
          // Include the entire post object as the body of the request
        //   body: userForm
        })
      })




    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useLoginUserMutation, useVerifyUserQuery, useGetAllUsersQuery, } = userApi