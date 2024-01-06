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

  return (
    <div>
      {data.map((user) => (
        <h1 key={user.id}>{user.name}</h1>
      ))}
    </div>
  );
}

export default UsersList;
