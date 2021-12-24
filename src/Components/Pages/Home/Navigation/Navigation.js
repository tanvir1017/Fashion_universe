import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import "./Navigation.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "25px",
  bgcolor: "background.paper",
  p: 4,
};
const Navigation = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, logout } = useAuth();
  const [myOrder, setMyOrder] = useState([]);
  const [num, setNum] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setNum(num + 1);
        setMyOrder(data);
      });
  }, [user.email, num]);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-warning">
        <div class="container">
          <Link class="navbar-brand" to="/">
            <img
              className="img-fluid brand_logo"
              src="https://i.ibb.co/rFgn02M/fashion-unlimited.gif"
              alt=""
            />
            <span className="brand_name">Fashion Universe</span>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              {user.email && (
                <Link class="nav-link active" to="/product">
                  Product
                </Link>
              )}
              {user.email && (
                <Link class="nav-link active" to="/about_us">
                  About us
                </Link>
              )}
              {user.email && (
                <Link class="nav-link active" to="/myOrders">
                  My orders
                </Link>
              )}
              {user.email && (
                <Link class="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
              )}

              {user.email ? (
                <span
                  style={{ cursor: "pointer" }}
                  class="nav-link active orders_length"
                >
                  <i className="fas fa-store"></i>{" "}
                  <span className="orders_length_from_api">
                    {" "}
                    <small>{myOrder.length}</small>{" "}
                  </span>
                </span>
              ) : (
                <span style={{ cursor: "pointer" }} class="nav-link active">
                  <i className="fas fa-store"></i>{" "}
                </span>
              )}
              <span
                style={{ cursor: "pointer" }}
                class="nav-link active"
                onClick={handleOpen}
              >
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="shadow">
              <Box id="transition-modal-title"></Box>
              <Box id="transition-modal-description" sx={{ mt: 2 }}>
                <h4>{user.displayName}</h4>
                <div className="mt-2">
                  {user.email ? (
                    <button className="google_btn" onClick={logout}>
                      {" "}
                      <span className="google_icon">
                        <i className="fab fa-google"></i>
                      </span>{" "}
                      Logout
                    </button>
                  ) : (
                    <button className="facebook_btn">
                      <span className="facebook_icon">
                        <i class="fab fa-facebook-f"></i>
                      </span>{" "}
                      <Link to="/registation">Sign in</Link>
                    </button>
                  )}
                </div>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Navigation;
