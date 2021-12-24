import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Components/Pages/Context/AuthProvider/AuthProvider";
import Dashboard from "./Components/Pages/Dashboard/Dashboard/Dashboard";
import AboutUs from "./Components/Pages/Home/AboutUs/AboutUs";
import Home from "./Components/Pages/Home/Home/Home";
import MyOrders from "./Components/Pages/Home/MyOrders/MyOrders";
import Navigation from "./Components/Pages/Home/Navigation/Navigation";
import PrivateRoute from "./Components/Pages/Home/Private/PrivateRoute";
import Product from "./Components/Pages/Home/Product/Product";
import ProductDetails from "./Components/Pages/Home/ProductDetails/ProductDetails";
import Login from "./Components/Pages/Home/Registation/Login";
import Registation from "./Components/Pages/Home/Registation/Registation";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/product"
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />

            <Route
              path="/myOrders"
              element={
                <PrivateRoute>
                  <MyOrders></MyOrders>
                </PrivateRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <PrivateRoute>
                  <ProductDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/about_us"
              element={
                <PrivateRoute>
                  <AboutUs />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path={`/log_in`} element={<Login />}></Route>

            <Route path={`/registation`} element={<Registation />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
