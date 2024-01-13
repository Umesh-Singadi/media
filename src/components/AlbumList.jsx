import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import AlbumListItem from "./AlbumListItem";
import Button from "./Button";

function AlbumList({ user }) {
  const { data, isLoading, error } = useFetchAlbumsQuery(user);

  let content;
  if (isLoading) {
    content = <Skeleton times={+10} className="h-10 w-full m-10"></Skeleton>;
  } else if (error) {
    content = <h1>Error fetching data...</h1>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album}></AlbumListItem>;
    });
  }

  return (
    <div>
      <Button className="ml-auto m-2" rounded success>
        Add Album
      </Button>
      {content}
    </div>
  );
}

export default AlbumList;
