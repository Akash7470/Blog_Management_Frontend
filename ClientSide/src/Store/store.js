import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "./Slices/BlogSlice";

const store = configureStore({
  reducer: {
    blogs: BlogSlice,
  },
});

export default store;
