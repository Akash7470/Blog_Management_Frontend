import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBlogByLoginUser() {
  const [addBlogCredentials, setAddBlogCredentials] = useState({
    title: "",
    description: "",
    image: "",
    user: "",
  });

  const navigate = useNavigate();
  const loginUser = JSON.parse(window.localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:5000/blog/add", {
        title: addBlogCredentials.title,
        description: addBlogCredentials.description,
        image: addBlogCredentials.image,
        user: loginUser._id,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res.status === 200) {
      console.log(res.data, "Blog Added Successfully");
      navigate("/allblogs");
    } else {
      alert("Blog Not Added !!");
    }

    console.log(res);
  };

  return (
    <div
      className="container border border-dark bg-light mt-5 rounded-4 "
      style={{ width: "33rem", height: "28rem" }}
    >
      <form autoComplete="On" onSubmit={handleSubmit}>
        <nav className="navbar bg- mt-4 mb-4 ">
          <div className="container-fluid">
            <h2>Add Blog.....!!!</h2>
          </div>
        </nav>
        <div className="mb-5 d-flex align-items-center">
          <label for="exampleInputPassword1" className="form-label">
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
          <label for="exampleInputEmail1" className="form-label">
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
          <label for="exampleInputPassword1" className="form-label">
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
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Add Blog
          </button>
          <button
            className="btn btn-danger"
            onClick={() => navigate("/allblogs")}
          >
            {" "}
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
