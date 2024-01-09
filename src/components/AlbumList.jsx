import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  function handleAddAlbum() {
    addAlbum(user);
  }

  let content;
  if (isLoading) {
    content = <Skeleton className="h-10 w-full" times={3}></Skeleton>;
  } else if (error) {
    content = <div>Error Loading albums</div>;
  } else {
    content = data.map((album) => {
      let header = (
        <div>
          <Button>Delete</Button>
          {album.title}
        </div>
      );
      return <ExpandablePanel key={album.id} header={header}></ExpandablePanel>;
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
