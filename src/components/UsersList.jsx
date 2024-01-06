import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useEffect } from "react";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <Skeleton times={5} className="h-10 w-full m-10"></Skeleton>;
  }
  if (error) {
    return <h1>Error</h1>;
  }

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
        <Button onClick={() => dispatch(addUser())} success rounded>
          + Add User
        </Button>
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
