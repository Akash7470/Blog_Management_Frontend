import { createSlice } from "@reduxjs/toolkit";
const BlogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    blogs(state, action) {
      // console.log(state);
      state.push(action.payload);
    },
    addBlog(state, action) {},
  },
});
export default BlogSlice.reducer;
// console.log(BlogSlice.reducer);
export const { blogs } = BlogSlice.actions;
