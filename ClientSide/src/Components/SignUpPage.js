import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [userType, setUserType] = useState("");
  const [signUpCredentials, setSignUpCredentials] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // console.log(secretKey);
    e.preventDefault();
    if (userType === "Admin" && secretKey.secretKey !== "Akash") {
      alert("Invalid Admin");
    } else {
      const res = await axios
        .post("http://localhost:5000/register/user", {
          fullname: signUpCredentials.fullname,
          email: signUpCredentials.email,
          username: signUpCredentials.username,
          password: signUpCredentials.password,
          usertype: userType,
        })
        .catch((err) => console.log(err));
      const data = await res.data;
      // console.log(res);
      if (res.status === 200) {
        console.log(data, "User Registered Successfully");

        navigate("/login/user");
      } else {
        alert("User Not Registered");
      }
    }
  };

  return (
    <div
      className="container border border-dark bg-light mt-5 rounded-4 "
      style={{ width: "33rem", height: "40rem" }}
    >
      <form autoComplete="Off" onSubmit={handleSubmit}>
        <nav className="navbar bg- mt-4 mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Registration As.........!!!
            </a>
            <div className="d-flex align-items-center gap-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="UserType"
                  id="flexRadioDefault1"
                  onClick={() => setUserType("User")}
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  User
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="UserType"
                  id="flexRadioDefault1"
                  onClick={() => setUserType("Admin")}
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  Admin
                </label>
              </div>
            </div>
          </div>
        </nav>
        {userType === "Admin" ? (
          <div className="mb-5 d-flex align-items-center">
            <label for="exampleInputPassword1" className="form-label">
              SecretKey:
            </label>
            <input
              type="text"
              className="form-control mx-4"
              id="exampleInputPassword1"
              placeholder="Enter Your Name"
              onChange={(e) =>
                setSecretKey({
                  ...secretKey,
                  secretKey: e.target.value,
                })
              }
            />
          </div>
        ) : (
          ""
        )}
        <div className="mb-5 d-flex align-items-center">
          <label for="exampleInputPassword1" className="form-label">
            Fullname:
          </label>
          <input
            type="text"
            className="form-control mx-4"
            id="exampleInputPassword1"
            placeholder="Enter Your Name"
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                fullname: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-5 d-flex align-items-center">
          <label for="exampleInputEmail1" className="form-label">
            Email address :
          </label>
          <input
            type="email"
            className="form-control mx-4"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-5 d-flex align-items-center">
          <label for="exampleInputPassword1" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control mx-4"
            id="exampleInputPassword1"
            placeholder="Enter Username"
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4 d-flex align-items-center">
          <label for="exampleInputPassword1" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control mx-4"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3 d-flex justify-content-end gap-2 text-muted">
          Already registered
          <a href="/login/user">Sign In</a>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
