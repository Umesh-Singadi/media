import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  let content;
  if (isLoading) {
    content = <Skeleton times={3}> </Skeleton>;
  } else if (error) {
    content = <div>Error Loading albums</div>;
  } else {
    content = data.map((album) => {
      let header = <div>{album.hobbies}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List Of Photos...
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div>Album for :{user.name}</div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumList;
