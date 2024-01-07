import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useEffect } from "react";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";
function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const count = data.length;
  let content;
  if (isLoadingUsers) {
    content = (
      <Skeleton times={count + 10} className="h-10 w-full m-10"></Skeleton>
    );
  } else if (loadingUsersError) {
    content = <h1>Error fetching data...</h1>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user}></UsersListItem>;
      // return (
      //   <div
      //     key={user.id}
      //     className="mb-2 border rounded bg-gray-50 hover:bg-gray-100"
      //   >
      //     <div className="flex p-2 justify-between items-center cursor-pointer">
      //       {user.name}
      //     </div>
      //   </div>
      // );
    });
  }

  const handleAddUser = () => {
    doCreateUser();
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3 ">
        <h1 className="m-2 text-xl">Users Count is : {data.length}</h1>

        <Button
          onClick={handleAddUser}
          loading={isCreatingUser}
          rounded
          success
        >
          + Add User
        </Button>

        {creatingUserError && "Error Creating user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
