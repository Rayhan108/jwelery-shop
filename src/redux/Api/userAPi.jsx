import { baseApi } from "./baseApi";


const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),

    signUp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    
    getProfile: builder.query({
      query: () => {
        return {
          url: "/profile",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllUserManagement: builder.query({
      query: () => {
        return {
          url: "/admin/users",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/verify-otp",
          method: "POST",
          body: data,
        };
      },
    }),
   
    resentOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/resend",
          method: "POST",
          body: data,
        };
      },
    }),
   
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
    resendHit: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/resend",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/profile/edit",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/profile/change-password",
          method: "POST",
          body: data,
        };
      },
    }),
    getHostUser: builder.query({
      query: ({ user, page, search }) => {
        return {
          url: `/dashboard/get-all-user?role=${user}&page=${page}&searchTerm=${search}`,
          method: "GET",
        };

      },
      providesTags: ["host"],
    }),

    blockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["updateProfile"], 
    }),
    
  }),
});

export const {
  useLoginUserMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetHostUserQuery,
  useBlockUserMutation,
  useResendHitMutation,
  useGetAllUserManagementQuery,
  useSignUpMutation,
  useResentOtpMutation
} = useApi;
