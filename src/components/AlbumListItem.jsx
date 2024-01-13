import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { FaTrashCan } from "react-icons/fa6";
import { useRemoveAlbumMutation } from "../store";

function AlbumListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const header = (
    <>
      <Button className="mr-3">
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
