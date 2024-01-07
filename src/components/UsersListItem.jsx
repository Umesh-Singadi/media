/* eslint-disable react/prop-types */

import { FaTrashCan } from "react-icons/fa6";
import Button from "./Button";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/use-thunk";

function UsersListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);
  function handleDelete() {
    doDeleteUser(user);
  }
  return (
    <div className="mb-2 border rounded bg-gray-50 hover:bg-gray-100">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between ">
          <Button className="mr-3" loading={isLoading} onClick={handleDelete}>
            <FaTrashCan />
          </Button>
          {error && <div>Error deleting user...</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
}

export default UsersListItem;
