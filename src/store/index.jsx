import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
