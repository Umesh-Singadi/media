/* eslint-disable react/prop-types */
import { FaTrashCan } from "react-icons/fa6";
import Button from "./Button";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";

function UsersListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);
  function handleDelete() {
    doDeleteUser(user);
  }
  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleDelete}>
        <FaTrashCan />
      </Button>
      {error && <div>Error deleting user...</div>}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
