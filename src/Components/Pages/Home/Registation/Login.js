import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import "./Registation.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const { log_in, error, isLoading, googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const hanldeSubmit = (e) => {
    e.preventDefault();
    log_in(login.email, login.password, location, navigate);
  };

  const handleInputField = (e) => {
    const filed = e.target.name;
    const value = e.target.value;
    const newLogin = { ...login };
    newLogin[filed] = value;
    setLogin(newLogin);
  };
  return (
    <div className="container ">
      <div className="loginForm">
        <div className="log_wrapper">
          <img
            className="img-fluid logo"
            src="https://i.ibb.co/rFgn02M/fashion-unlimited.gif"
            alt=""
          />
          <h4 className="mt-2 mb-3 login_title">
            Fashion Universe wants to log in with email
          </h4>
          {!isLoading && (
            <form onSubmit={hanldeSubmit}>
              <TextField
                style={{ width: "75%" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onBlur={handleInputField}
              />
              <br />
              <br />
              <TextField
                style={{ width: "75%" }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                onBlur={handleInputField}
              />
              {error && <p className="text-danger fw-bold">{error}</p>}
              <button type="submit" className="google_btn mt-3">
                {" "}
                <span className="google_icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>{" "}
                Sign in
              </button>
            </form>
          )}
          {isLoading && (
            <div>
              <img src="https://i.ibb.co/CsKCt7M/cogs.gif" alt="" />
            </div>
          )}
          <div className="mt-2">
            Doesn't have any account! <Link to="/registation">Registation</Link>
            <div className="mt-2">
              <button
                className="google_btn"
                onClick={() => googleSignIn(location, navigate)}
              >
                {" "}
                <span className="google_icon">
                  <i className="fab fa-google"></i>
                </span>{" "}
                Google
              </button>
              <button className="facebook_btn">
                <span className="facebook_icon">
                  <i class="fab fa-facebook-f"></i>
                </span>{" "}
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
