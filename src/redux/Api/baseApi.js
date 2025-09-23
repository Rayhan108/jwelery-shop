import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// API Base URL
// const baseUrl = "https://api.cathysjewelry.net"; // Replace with the actual base URL
const baseUrl = "http://51.21.17.89:5000"; // Replace with the actual base URL
// const baseUrl = "http://10.10.20.26:3000"; // Replace with the actual base URL

// Helper function to get the token
const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  } else {
    // Client-side logic
    return localStorage.getItem("accessToken");
  }
};

// Base Query with Refresh Token
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  // Handle API errors with better debugging
  if (result?.error) {
    const { status, data } = result.error;

    // Handle 404 or 403 errors
    // if (status === 404 || status === 403) {
    //   message.error(data?.message || "Something went wrong.");
    // }
    console.log(result.error);
    // Handle 401 (Unauthorized) - Refresh Token Logic
    if (status === 401) {

      Cookies.remove("jewellery-web-token");
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/signIn";
      toast.error("Unauthorized access. Please log in again.");
    }
  }

  return result;
};

// Create API with endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "profile",
    "event",
    "videos",
    "updateProfile",
  ], // Add your tagTypes
  endpoints: () => ({}),
});

export default baseApi;
