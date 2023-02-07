import { useNavigate } from "react-router-dom";

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

  return (
    <div
      onClick={() => {
        onClick(blogId);
        navigate("/allblogs/clickedblog");
      }}
      className="card mb-3"
    >
      <img
        style={{
          width: "46.5rem",
          height: "24rem",
        }}
        src={imageUrl}
        className="card-img-top"
        alt="Ni h"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text d-flex align-items-center justify-content-between">
          <div className="">
            Email: <small className="text-muted">{userEmail}</small> <br />
            FullName: <small className="text-muted">{userFullName}</small>
          </div>
          {loginUser.email === userEmail ? (
            <p style={{ color: "skyblue" }}>
              You Can edit & Delete This Blog...
            </p>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};
