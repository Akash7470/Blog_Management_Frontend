import { useEffect, useState } from "react";
import axios from "axios";
import { BlogData } from "./BlogData";
import jwtDecode from "jwt-decode";

const UserBlog = () => {
  const [loginUserBlog, setLoginUserBlog] = useState();

  const loginUser = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    userData();
    // console.log(loginUser, "tokenData-------------");
  }, []);

  const userData = async () => {
    // console.log(loginUser?.loginUser._id);
    try {
      const res = await axios.get(
        `http://localhost:5000/user/blog/${loginUser?.loginUser._id}`
      );
      if (res.status === 200) {
        // console.log("Login User Blogs ", res.data);
        setLoginUserBlog(res.data.blogs.blogs);
      } else {
        alert("No Blogs are Available !!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-4" style={{ width: "48rem" }}>
      {loginUserBlog?.map((elem, index) => {
        return (
          <BlogData
            key={index}
            imageUrl={elem.image}
            title={elem.title}
            description={elem.description}
            userEmail={loginUser?.loginUser.email}
            userFullName={loginUser?.loginUser.fullname}
          />
        );
      })}
    </div>
  );
};

export default UserBlog;
