import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import { useEffect } from "react";

function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {data.map((user) => (
            <h1 key={user.key}>{user.name}</h1>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersList;
