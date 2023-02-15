import "./App.css";
import SignUpPage from "./Components/SignUpPage";
import LoginPage from "./Components/LoginPage";
import Homepage from "./Components/Homepage";
import UserBlog from "./Components/UserBlog";
import AddBlog from "./Components/AddBlogByLoginUser";
import { ClickedBlog } from "./Components/ClickedBlog";
import UpdateBlog from "./Components/UpdateBlog";
import store from "./Store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
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
            <Route path={"/user/admin"} element={<Homepage />} />
            <Route path={"/allblogs/update"} element={<UpdateBlog />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
