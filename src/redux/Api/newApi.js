import { baseApi } from "./baseApi";

const newApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // signUp: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/auth/signup",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),
    
    getContactUsInfo: builder.query({
      query: () => {
        return {
          url: "/contact-details",
          method: "GET",
        };
      },
    }),

  }),
});

export const {
    useGetContactUsInfoQuery,
} = newApi;
