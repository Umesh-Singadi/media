import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { FaTrashCan } from "react-icons/fa6";
import { useRemoveAlbumMutation } from "../store";

function AlbumListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  function handleRemoveAlbum() {
    removeAlbum(album);
  }
  const header = (
    <>
      <Button
        className="mr-3"
        loading={results.isLoading}
        onClick={handleRemoveAlbum}
      >
        <FaTrashCan />
      </Button>
      <h1>{album.title}</h1>
    </>
  );
  return (
    <>
      <ExpandablePanel header={header}></ExpandablePanel>
    </>
  );
}

export default AlbumListItem;
