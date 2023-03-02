import { Component} from "react";
import axios from "axios";
import withRouter from "../utilFiles/withRouter";

class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    }
  }
  render(){
  const handleSubmit = async (e) => {
    // console.log(this.props);
    e.preventDefault();
    const res = await axios
      .post("http://localhost:5000/login/user", {
        email: this.state.email,
        password: this.state.password,
      })
      .catch((err) => {
        console.log(err);
      });
    const data = res.data;
    if (data.status === "Ok") {
      console.log(data.data, "LoginUseroiopo-----------------");
      window.localStorage.setItem("token", JSON.stringify(data.data));
    
      if (data.data.usertype === "Admin") {
        this.props.navigate("/user/admin");
      } else {
        this.props.navigate("/allblogs");
       

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
          <label  className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) =>
              this.setState({email: e.target.value})
            }
          />
        </div>
        <div className="mb-4 d-flex gap-3">
          <label  className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) =>
             this.setState({password:e.target.value} )
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
}

export default withRouter(LoginPage)
