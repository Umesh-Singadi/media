import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import { useEffect } from "react";
import Skeleton from "./Skeleton";

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
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));

  return <div>{renderedUsers}</div>;
}

export default UsersList;
