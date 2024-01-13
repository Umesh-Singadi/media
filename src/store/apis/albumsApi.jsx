import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
const BASE_URL = "http://localhost:3005";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: "/albums",
            method: "GET",
            params: { userId: user.id },
          };
        },
      }),
      removeAlbum: builder.mutation({
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      addAlbum: builder.mutation({
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: { title: faker.commerce.productName(), userId: user.id },
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useRemoveAlbumMutation,
  useAddAlbumMutation,
} = albumsApi;
export { albumsApi };
