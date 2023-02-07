import "./App.css";
import SignUpPage from "./Components/SignUpPage";
import LoginPage from "./Components/LoginPage";
import Homepage from "./Components/Homepage";
import UserBlog from "./Components/UserBlog";
import AddBlog from "./Components/AddBlogByLoginUser";
import { ClickedBlog } from "./Components/ClickedBlog";
import UpdateBlog from "./Components/UpdateBlog";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={"/"} element={<LoginPage />} />
          <Route path={"/login/user"} element={<LoginPage />} />
          <Route path={"/register/user"} element={<SignUpPage />} />
          <Route path={"/allblogs"} element={<Homepage />} />
          <Route path={"/loginuser/blogs"} element={<UserBlog />} />
          <Route path={"/allblogs/clickedblog"} element={<ClickedBlog />} />
          <Route path={"/blog/user"} element={<AddBlog />} />
          <Route
            path={"/allblogs/clickedblog/update"}
            element={<UpdateBlog />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
