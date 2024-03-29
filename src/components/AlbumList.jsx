/* eslint-disable react/prop-types */
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumListItem from "./AlbumListItem";

function AlbumList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  function handleAddAlbum() {
    addAlbum(user);
  }

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3}></Skeleton>;
  } else if (error) {
    content = <div>Error Loading albums</div>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album}></AlbumListItem>;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold"> Album for :{user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          +Add album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumList;
