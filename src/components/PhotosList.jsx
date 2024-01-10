/* eslint-disable react/prop-types */
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";

function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation(album);

  function handleAddPhotos() {
    addPhoto(album);
  }
  let content;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={3}></Skeleton>;
  } else if (error) {
    content = <div>Error fetching photos..</div>;
  } else {
    content = data.map((photo) => {
      return (
        <PhotosListItem
          key={photo.id}
          photo={photo}
          photoId={photo.id}
        ></PhotosListItem>
      );
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhotos}>
          +Add Photos
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;
