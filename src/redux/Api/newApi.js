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
    
    getSocialLinks: builder.query({
      query: () => {
        return {
          url: "/social-details",
          method: "GET",
        };
      },
    }),

  }),
});

export const {
    useGetContactUsInfoQuery,
    useGetSocialLinksQuery,
} = newApi;
