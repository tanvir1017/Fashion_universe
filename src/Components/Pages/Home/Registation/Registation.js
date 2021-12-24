import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../../Hooks/useAuth";
import "./Registation.css";

const Registation = () => {
  const [registation, setRegistation] = useState("");
  const { googleSignIn, sign_up, error, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    sign_up(
      registation.email,
      registation.password,
      registation.name,
      location,
      navigate
    );
    if (registation.password !== registation.retype_password) {
      swal({
        title: "Please set the password correctly",
        text: "The password you given is not matched with Retype-password",
        icon: "error",
        button: "Opps!",
      });
      return;
    }
  };
  const handleInputField = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newUser = { ...registation };
    newUser[field] = value;
    setRegistation(newUser);
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
          <h4 className="mt-2 mb-3 login_title">Registation</h4>
          {!isLoading && (
            <form onSubmit={handleSubmit}>
              <TextField
                style={{ width: "75%" }}
                id="outlined-basic"
                label="Full_Name"
                name="name"
                required
                onBlur={handleInputField}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                style={{ width: "75%" }}
                id="outlined-basic"
                label="Email"
                name="email"
                required
                onBlur={handleInputField}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                style={{ width: "75%" }}
                id="outlined-basic"
                label="Password"
                name="password"
                type="password"
                onBlur={handleInputField}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                style={{ width: "75%" }}
                id="outlined-basic"
                label="Retype_Password"
                name="retype_password"
                type="password"
                onBlur={handleInputField}
                variant="outlined"
              />
              {error && <p className="text-danger fw-bold">{error}</p>}
              <button type="submit" className="google_btn mt-3">
                {" "}
                <span className="google_icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>{" "}
                Sign up
              </button>
            </form>
          )}
          {isLoading && <img src="https://i.ibb.co/CsKCt7M/cogs.gif" alt="" />}

          <div className="mt-2">
            Already have an account? <Link to="/log_in">Log in</Link>
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

export default Registation;
