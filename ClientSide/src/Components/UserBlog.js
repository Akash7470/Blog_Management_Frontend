import { useEffect, useState } from "react";
import axios from "axios";
import { BlogData } from "./BlogData";

const UserBlog = () => {
  const [loginUserBlog, setLoginUserBlog] = useState();

  const loginUser = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    console.log(loginUser._id);
    const res = await axios
      .get(`http://localhost:5000/user/blog/${loginUser._id}`)
      .catch((err) => console.log(err));
    if (res.status === 200) {
      console.log("Login User Blogs ", res.data);
      setLoginUserBlog(res.data.blogs.blogs);
    } else {
      alert("No Blogs are Available !!");
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
            userEmail={loginUser.email}
            userFullName={loginUser.fullname}
          />
        );
      })}
    </div>
  );
};

export default UserBlog;
