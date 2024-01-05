import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <Skeleton times={6}></Skeleton>
      ) : (
        <div>
          {data.map((user) => {
            return <h1 key={user.id}>{user.name}</h1>;
          })}
        </div>
      )}
    </div>
  );
}

export default UsersList;
