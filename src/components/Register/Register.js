import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { registerNewUser } from "../../services/apiService";


const Register = (props) => {

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const deafaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUserName: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  }
  const [objCheckInput, setObjCheckInput] = useState(deafaultValidInput);

  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/test-api").then(data => {
    //   console.log(">>>check data: ", data)

  }, [])

  const isValidInputs = () => {
    setObjCheckInput(deafaultValidInput)
    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...deafaultValidInput, isValidEmail: false })
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...deafaultValidInput, isValidEmail: false })
      return false;
    }
    if (!phone) {
      toast.error("Phone is required");
      setObjCheckInput({ ...deafaultValidInput, isValidPhone: false })

      return false;
    }
    if (!username) {
      toast.error("UserName is required");
      setObjCheckInput({ ...deafaultValidInput, isValidUserName: false })

      return false;
    }
    if (!password) {
      toast.error("Password is required");
      setObjCheckInput({ ...deafaultValidInput, isValidPassword: false })

      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same")
      setObjCheckInput({ ...deafaultValidInput, isValidConfirmPassword: false })

      return false;
    }



    return true;
  }

  const handleRegister = async () => {
    let check = isValidInputs();

    if (check === true) {
      let res = await registerNewUser(email, phone, username, password);
      let serverData = res.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM)
        history.push("/login");
      } else {
        toast.error(serverData.EM)
      }
    }


  }

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Hai Long</div>
            <div className="detail">Learning everything</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">Hai Long</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"}
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className={objCheckInput.isValidPhone ? "form-control" : "form-control is-invalid"}
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className={objCheckInput.isValidUserName ? "form-control" : "form-control is-invalid"}
                placeholder="User name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Pasword:</label>
              <input
                type="password"
                className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Pasword:</label>
              <input
                type="password"
                className={objCheckInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"}
                placeholder="Re-enter Pasword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => handleRegister()}>Register</button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
