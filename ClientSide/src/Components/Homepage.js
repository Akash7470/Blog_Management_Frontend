import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogData } from "./BlogData";
import { ClickedBlog } from "./ClickedBlog";

export default function Homepage() {
  const [blogData, setBlogData] = useState();
  const loginUser = JSON.parse(window.localStorage.getItem("token"));
  const [cardOpen, setCardOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    gettingData();
    // console.log(loginUser);
  }, []);

  const gettingData = async () => {
    const res = await axios
      .get("http://localhost:5000/allblogs")
      .catch((err) => console.log(err));
    // console.log(res.data.blogs);
    setBlogData(res.data.blogs);
  };

  const blogOpen = (e) => {
    setCardOpen(true);

    JSON.stringify(window.localStorage.setItem("blogId", e));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success px-4">
        <div className="container-fluid">
          <h2> BlogsApp</h2>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/allblogs"
                >
                  All Blogs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/loginuser/blogs">
                  My Blogs
                </a>
              </li>
            </ul>
            <ul className="d-flex gap-5">
              <button
                className="btn btn-dark"
                onClick={(e) => navigate("/blog/user")}
              >
                {" "}
                Add Blogs
              </button>
              <button
                onClick={(e) => navigate("/")}
                className="btn btn-danger"
                type="button"
              >
                Log Out
              </button>
            </ul>
          </div>
        </div>
      </nav>
      <div className=" d-flex gap-5">
        <div className="container mt-4" style={{ width: "48rem" }}>
          {blogData?.map((elem, index) => {
            return (
              <BlogData
                key={index}
                blogId={elem._id}
                imageUrl={elem.image}
                title={elem.title}
                description={elem.description}
                userEmail={elem.user.email}
                userFullName={elem.user.fullname}
                onClick={blogOpen}
              />
            );
          })}
        </div>
        <div className="p-3">
          <div
            className="card text-bg-light mb-3 p-1 "
            style={{ maxWidth: " 18rem", maxHeight: "12rem" }}
          >
            <div className="card-header text-center">User Details</div>
            <div className=" text-start">
              <div className="card-title d-flex gap-2 ">
                FullName: <h5 className="card-title">{loginUser.fullname}</h5>
              </div>
              <div className="card-title d-flex gap-2">
                UserName: <p className="card-text">{loginUser.username}</p>
              </div>
              <div className="card-title d-flex gap-2">
                Email: <p className="card-text">{loginUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cardOpen && <ClickedBlog />}
    </div>
  );
}
