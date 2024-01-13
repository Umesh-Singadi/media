import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const BASE_URL = "http://localhost:3005";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),

  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (results, error, user) => {
          console.log(results);

          const tags = results.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbum", id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "GET",
            params: { userId: user.id },
          };
        },
      }),

      addAlbum: builder.mutation({
        invalidatesTags: (results, error, user) => {
          return [{ type: "UsersAlbum", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: { title: faker.commerce.productName(), userId: user.id },
          };
        },
      }),

      removeAlbum: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
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

export const {
  useFetchAlbumsQuery,
  useRemoveAlbumMutation,
  useAddAlbumMutation,
} = albumsApi;
export { albumsApi };
