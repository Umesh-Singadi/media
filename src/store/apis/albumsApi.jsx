import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    };
  },
});

export const { useFetchAlbumsQuery, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
