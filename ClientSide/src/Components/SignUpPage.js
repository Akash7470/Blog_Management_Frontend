import axios from "axios";
import { Component } from "react";
// import { useNavigate } from "react-router-dom";

class SignUpPage extends Component{
  constructor(props){
    super(props);
    this.state={
      fullname: "",
      email: "",
      username: "",
      password: "",
      userType:"",
      secretKey:""

    }
  }  
  // const navigate = useNavigate();

    handleSubmit = async (e) => {
    // console.log(secretKey);
    e.preventDefault();
    if (this.state.userType === "Admin" && this.state.secretKey !== "Akash") {
      alert("Invalid Admin");
    } else {
      const res = await axios
        .post("http://localhost:5000/register/user", {
          fullname: this.state.fullname,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          usertype: this.state.userType,
        })
        .catch((err) => console.log(err));
      const data = await res.data;
      // console.log(res);
      if (res.status === 200) {
        console.log(data, "User Registered Successfully");

        // navigate("/login/user");
      } else {
        alert("User Not Registered");
      }
    }
  };
  render(){
  return (
    <div
      className="container border border-dark bg-light mt-5 rounded-4 "
      style={{ width: "33rem", height: "40rem" }}
    >
      <form autoComplete="Off" onSubmit={this.handleSubmit}>
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
                  onClick={() => this.setState({userType:"User"})}
                />
                <label className="form-check-label" >
                  User
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="UserType"
                  id="flexRadioDefault1"
                  onClick={() => this.setState({userType:"Admin"})}
                />
                <label className="form-check-label">
                  Admin
                </label>
              </div>
            </div>
          </div>
        </nav>
        {this.state.userType === "Admin" ? (
          <div className="mb-5 d-flex align-items-center">
            <label  className="form-label">
              SecretKey:
            </label>
            <input
              type="text"
              className="form-control mx-4"
              id="exampleInputPassword1"
              placeholder="Enter Your Name"
              onChange={(e) =>
                this.setState({secretKey:e.target.value})
              }
            />
          </div>
        ) : (
          ""
        )}
        <div className="mb-5 d-flex align-items-center">
          <label  className="form-label">
            Fullname:
          </label>
          <input
            type="text"
            className="form-control mx-4"
            id="exampleInputPassword1"
            placeholder="Enter Your Name"
            onChange={(e) =>
              this.setState({fullname:e.target.value})
            }
          />
        </div>
        <div className="mb-5 d-flex align-items-center">
          <label className="form-label">
            Email address :
          </label>
          <input
            type="email"
            className="form-control mx-4"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            onChange={(e) =>
             this.setState({email:e.target.value})
            }
          />
        </div>
        <div className="mb-5 d-flex align-items-center">
          <label  className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control mx-4"
            id="exampleInputPassword1"
            placeholder="Enter Username"
            onChange={(e) =>
              this.setState({username: e.target.value})
            }
          />
        </div>
        <div className="mb-4 d-flex align-items-center">
          <label  className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control mx-4"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            onChange={(e) =>
              this.setState({
                password: e.target.value
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
}

export default SignUpPage
