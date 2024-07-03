import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import List from "./List";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../context/userSlice";
import {
  BrowserRouter,
  Router,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";

function Login() {
  const [LoginId, setLoginId] = useState("0");
  const [Password, setPassword] = useState("0");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  interface User {
    id: any;
    name: string;
    password: string;
    createDate: string;
    updatedate: string;
  }
  const newuser: User = {
    id: 1,
    name: "Electronics",
    password: "Password",
    createDate: "2024-01-25T12:35:31.7593775",
    updatedate: "2024-01-25T12:35:31.7593775",
  };
  const uvalue = useSelector((state: any) => state.users);
  console.log("fro useSelector : ", uvalue);
  const submitform = (event: any) => {
    event.preventDefault();
    console.log(LoginId, Password);
    axios
      .get(
        "https://localhost:7160/api/user/Checkuser?name=" +
          LoginId +
          "&password=" +
          Password
      )
      .then((res) => {
        console.log(res.data);
        if (res.data != "") {
          console.log("res.headers : " + res.headers);
          dispatch(addUser(res.data));
          navigate("/category");
        }
      });
  };

  var list: User[] = [newuser];

  useEffect(() => {});

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="row col-4">
            <form onSubmit={submitform}>
              <div className="form-group">
                <label htmlFor="LoginId">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  id="LoginId"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setLoginId(event.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
