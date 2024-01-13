import { FaTrashCan } from "react-icons/fa6";
import { useRemovePhotoMutation } from "../store";

function PhotosListItem({ photo }) {
  const [removePhoto, result] = useRemovePhotoMutation();
  return (
    <div
      className="relative m-2 cursor-pointer"
      onClick={() => removePhoto(photo)}
    >
      <img className="size-40" src={photo.img} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <FaTrashCan className="text-3xl"></FaTrashCan>
      </div>
    </div>
  );
}

export default PhotosListItem;
