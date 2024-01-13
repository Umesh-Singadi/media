import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
const BASE_URL = "http://localhost:3005";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (results, error, album) => {
          let tags = results.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhotos", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            url: "/photos",
            method: "GET",
            params: { albumId: album.id },
          };
        },
      }),

      addPhotos: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: "AlbumPhotos", id: album.id }];
        },
        query: (album) => {
          return {
            url: "/photos",
            method: "POST",
            body: { albumId: album.id, img: faker.image.avatar() },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (results, error, photo) => {
          return [{ type: "Photo", id: photo.id }];
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export const {
  useFetchPhotosQuery,
  useAddPhotosMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
