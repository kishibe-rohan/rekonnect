import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./redux/reducers/userReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
