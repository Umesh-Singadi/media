import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.users);
  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((error) => setLoadingUsersError(error))
      .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);

  if (isLoadingUsers) {
    return <Skeleton times={5} className="h-10 w-full m-10"></Skeleton>;
  }
  if (loadingUsersError) {
    return <h1>Error</h1>;
  }

  const handleAddUser = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((error) => setCreatingUserError(error))
      .finally(() => setIsCreatingUser(false));
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
