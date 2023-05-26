import React, { useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from "../../services/apiService";

const Login = (props) => {
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState("");
  const [pasword, setPasword] = useState();

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  }

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleCreateNewAccount = () => {
    history.push("/register")
  }

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);

    if (!valueLogin) {
      setObjValidInput({ ...objValidInput, isValidValueLogin: false });
      toast.error("Please enter your email or phone number");
      return;
    }
    if (!pasword) {
      setObjValidInput({ ...objValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }

    await loginUser(valueLogin, pasword);
  }
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Hai Long</div>
            <div className="detail">Learning everything</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">Hai Long</div>
            <input
              type="text"
              className={objValidInput.isValidValueLogin === true ? "form-control" : "is-invalid form-control"}
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => { setValueLogin(event.target.value) }}
            />
            <input
              type="password"
              className={objValidInput.isValidPassword === true ? "form-control" : "is-invalid form-control"}
              placeholder="Password"
              value={pasword}
              onChange={(event) => { setPasword(event.target.value) }}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
            <span className="text-center">
              <a className="forgot-password" href="#"> Forgot your password?</a>
            </span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleCreateNewAccount()}>
                Create a new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
