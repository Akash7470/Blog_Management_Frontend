import { useNavigate } from "react-router-dom";
import axios from "axios";
export const BlogData = ({
  blogId,
  imageUrl,
  description,
  title,
  userEmail,
  userFullName,
  onClick,
}) => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(window.localStorage.getItem("token"));
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
    <div className="card mb-3">
      <img
        style={{
          width: "46.5rem",
          height: "24rem",
        }}
        onClick={() => {
          onClick(blogId);
          navigate("/allblogs/clickedblog");
        }}
        src={imageUrl}
        className="card-img-top"
        alt="Ni h"
      />
      <div className="card-body">
        <h5
          className="card-title"
          onClick={() => {
            onClick(blogId);
            navigate("/allblogs/clickedblog");
          }}
        >
          {title}
        </h5>
        <p
          className="card-text"
          onClick={() => {
            onClick(blogId);
            navigate("/allblogs/clickedblog");
          }}
        >
          {description}
        </p>
        <div className="card-text d-flex align-items-center justify-content-between">
          <div className="">
            Email: <small className="text-muted">{userEmail}</small> <br />
            FullName: <small className="text-muted">{userFullName}</small>
          </div>
          {/* {loginUser.email === userEmail ? (
            <p style={{ color: "skyblue" }}>
              You Can edit & Delete This Blog...
            </p>
          ) : (
            ""
          )} */}
          {loginUser.usertype === "Admin" ? (
            <div className=" d-flex justify-content-end gap-3">
              <button
                onClick={() => navigate("/allblogs/update")}
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
        </div>
      </div>
    </div>
  );
};
