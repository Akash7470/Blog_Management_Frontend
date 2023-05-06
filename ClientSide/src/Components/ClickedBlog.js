import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const circleStyle = {
  width: "50px",
  height: "50px",
  backgroungColor: "red",
  border: "2px",
  position: "absolute",
  right: "22%",
  top: "4%",
  cursor: "wait",
  textDecoration: "none",
};

export const ClickedBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState();
  const blogId = window.localStorage.getItem("blogId");
  const loginUser = jwtDecode(localStorage.getItem("token"));
  const getClickedBlogData = async () => {
    const res = await axios
      .get(`http://localhost:5000/blog/${blogId}`)
      .catch((err) => {
        console.log(err);
      });
    if (res.status === 200) {
      setBlogData(res.data.blog);
      // console.log(res.data.blog, "Clicked Blog is..");
    } else {
      alert("Nothing");
    }
  };
  useEffect(() => {
    getClickedBlogData();
  }, []);

  const handleDeleteBtn = async () => {
    const res = await axios
      .delete(`http://localhost:5000/blog/delete/${blogId}`)
      .catch((err) => console.log(err));
    if (res.status === 200) {
      navigate("/allblogs");
      console.log(res, "Deleted Data !! ");
    }
  };

  return (
    <div className="container-fluid p-5" style={{ width: "52.5rem" }}>
      <p onClick={() => navigate("/allblogs")} style={circleStyle}>
        ❌
      </p>
      {blogData && (
        <div className="card mb-3">
          <img
            style={{
              width: "46.5rem",
              height: "24rem",
            }}
            src={blogData.image}
            className="card-img-top"
            alt="Ni h"
          />
          <div className="card-body">
            <h5 className="card-title">{blogData.title}</h5>
            <p className="card-text">{blogData.description}</p>
            <p className="card-text d-flex align-items-center justify-content-between">
              <div className="">
                Email:{" "}
                <small className="text-muted">{blogData.user.email}</small>{" "}
                <br />
                FullName:{" "}
                <small className="text-muted">{blogData.user.fullname}</small>
              </div>
              {loginUser?.loginUser.email ===
              (blogData && blogData.user.email) ? (
                <div className=" d-flex justify-content-end gap-3">
                  <button
                    onClick={() =>
                      navigate("/allblogs/update", {
                        state: {
                          imageUrl: blogData.image,
                          description: blogData.description,
                          title: blogData.title,
                          userEmail: blogData.user.email,
                          userFullName: blogData.user.fullname,
                        },
                      })
                    }
                    className="btn btn-info"
                  >
                    update
                  </button>
                  <button
                    onClick={() => handleDeleteBtn()}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </div>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
