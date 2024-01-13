import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import AlbumListItem from "./AlbumListItem";
import Button from "./Button";
import { useAddAlbumMutation } from "../store";

function AlbumList({ user }) {
  const { data, isFetching, error } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  function handleAddAlbum() {
    addAlbum(user);
  }
  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full m-10"></Skeleton>;
  } else if (error) {
    content = <h1>Error fetching data...</h1>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album}></AlbumListItem>;
    });
  }

  return (
    <div>
      <div className=" m-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">Albums for :{user.name}</h3>
        <Button
          className="m-2"
          rounded
          success
          onClick={handleAddAlbum}
          loading={results.isLoading}
        >
          + Add Album
        </Button>
      </div>

      {content}
    </div>
  );
}

export default AlbumList;
