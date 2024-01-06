import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import { useEffect } from "react";

function UsersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <h1>Users List</h1>
    </div>
  );
}

export default UsersList;
