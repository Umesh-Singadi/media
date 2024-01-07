import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useEffect } from "react";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  if (isLoadingUsers) {
    return <Skeleton times={5} className="h-10 w-full m-10"></Skeleton>;
  }
  if (loadingUsersError) {
    return <h1>Error</h1>;
  }

  const handleAddUser = () => {
    doCreateUser();
  };

  const renderedUsers = data.map((user) => (
    <div
      key={user.id}
      className="mb-2 border rounded bg-gray-50 hover:bg-gray-100"
    >
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));

  return (
    <div>
      <div className="flex flex-row justify-between m-3 ">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          "Creating user"
        ) : (
          <Button onClick={handleAddUser} success rounded>
            + Add User
          </Button>
        )}
        {creatingUserError && "Error Creating user..."}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
