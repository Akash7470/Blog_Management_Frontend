import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateBlog() {
  const [addBlogCredentials, setAddBlogCredentials] = useState({
    title: "",
    description: "",
    image: "",
    user: "",
  });

  const navigate = useNavigate();
  const loginUser = JSON.parse(window.localStorage.getItem("token"));
  const blogId = window.localStorage.getItem("blogId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(blogId);
    const res = await axios
      .put(`http://localhost:5000/blog/update/${blogId}`, {
        title: addBlogCredentials.title,
        description: addBlogCredentials.description,
        image: addBlogCredentials.image,
        user: loginUser._id,
      })
      .catch((err) => console.log(err));
    // console.log(res);
    if (res.status === 200) {
      console.log(res.data, "Blog Updated Successfully");
      navigate("/allblogs");
    } else {
      alert("Blog Not Updated !!");
    }
  };

  return (
    <div
      className="container border border-dark bg-light mt-5 rounded-4 "
      style={{ width: "33rem", height: "35rem" }}
    >
      <form autoComplete="Off" onSubmit={handleSubmit}>
        <nav className="navbar bg- mt-4 mb-4">
          <div className="container-fluid">
            <h2>Update Blog.....!!!</h2>
          </div>
        </nav>
        <div className="mb-5 d-flex align-items-center">
          <label  className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control mx-4"
            id="exampleInputPassword1"
            placeholder="Enter Your Blog Title"
            onChange={(e) =>
              setAddBlogCredentials({
                ...addBlogCredentials,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-5 d-flex align-items-center">
          <label  className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control mx-4"
            id="exampleInputEmail1"
            placeholder="Enter Your Blog Description"
            onChange={(e) =>
              setAddBlogCredentials({
                ...addBlogCredentials,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-5 d-flex align-items-center">
          <label className="form-label">
            Image Url:
          </label>
          <input
            type="text"
            className="form-control mx-4"
            placeholder="Enter Image Url"
            onChange={(e) =>
              setAddBlogCredentials({
                ...addBlogCredentials,
                image: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Blog
        </button>
      </form>
    </div>
  );
}
