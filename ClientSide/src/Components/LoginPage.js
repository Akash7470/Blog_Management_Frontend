import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
export default function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:5000/login/user", {
        email: loginCredentials.email,
        password: loginCredentials.password,
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(res, "result");
    if (res?.data?.status === "Ok") {
      localStorage.setItem("token", JSON.stringify(res?.data.data));
      const data = jwtDecode(res?.data.data);
      // console.log(data.loginUser.usertype, "LoginUseroiopo-----------------");
      if (data.loginUser.usertype === "Admin") {
        navigate("/user/admin");
      } else {
        navigate("/allblogs");
      }
    } else {
      alert("User Not Found !!");
    }
  };

  return (
    <div
      className="container bg-light border border-dark mt-5 rounded-4  "
      style={{ width: "30rem", height: "25rem" }}
    >
      <nav className="navbar bg- mt-4 mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Login Here .........!!!
          </a>
        </div>
      </nav>

      <form autoComplete="Off" onSubmit={handleSubmit} className="mt-1">
        <div className="mb-4 d-flex gap-1">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4 d-flex gap-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-4 form-check d-flex justify-content-start align-items-start gap-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <p> Keep me Login....</p>
        </div>

        <button type="submit" className="btn btn-primary mb-4">
          Login
        </button>
        <div className="d-flex justify-content-between align-items-start">
          <a href="/register">Forget password..?</a>
          <div className="d-flex gap-2 text-muted">
            Don't have an account<a href="/register/user">Sign-Up</a>
          </div>
        </div>
      </form>
    </div>
  );
}
