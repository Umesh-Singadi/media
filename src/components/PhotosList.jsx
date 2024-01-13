/* eslint-disable react/prop-types */
import { useFetchPhotosQuery, useAddPhotosMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhotos, results] = useAddPhotosMutation();
  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full m-10"></Skeleton>;
  } else if (error) {
    content = <h1>Error fetching data...</h1>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos of :{album.title}</h3>
        <Button
          className=""
          rounded
          success
          onClick={() => addPhotos(album)}
          loading={results.isLoading}
        >
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;
