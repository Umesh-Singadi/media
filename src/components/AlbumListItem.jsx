/* eslint-disable react/prop-types */
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { FaTrashCan } from "react-icons/fa6";
import { useDeleteAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

function AlbumListItem({ album }) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  function handleDeleteAlbum() {
    deleteAlbum(album);
  }

  let header = (
    <>
      <Button
        className="mr-4"
        loading={results.isLoading}
        onClick={handleDeleteAlbum}
      >
        <FaTrashCan />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album}></PhotosList>
    </ExpandablePanel>
  );
}

export default AlbumListItem;
