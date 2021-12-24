import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../../Hooks/useAuth";
import "./ProductDetails.css";
const ProductDetails = () => {
  const { id } = useParams();
  const [singleData, setSingleData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const { user } = useAuth();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDicrease = () => {
    if (quantity === 0) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleData(data);
      });
  }, [id]);

  const {
    avilavility,
    brand,
    condition,
    description,
    img,
    pcode,
    price,
    rating,
    title,
    name,
  } = singleData;
  const data = {
    name: name,
    pcode: pcode,
    price: price,
    brand: brand,
    img: img,
    rating: rating,
    email: user.email,
    pending: true,
    displayName: user.displayName,
  };

  const handleBuyPost = () => {
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          swal({
            title: "Order Recived Successfully",
            text: "our delivery soldier will give the product within 5 to 7 days",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-5 col-md-5 col-12">
          <div className="column">
            <img src={img} className="img-fluid shadow" alt="" />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="column text-start">
            <small className="product_condition">{condition}</small>
            <h2 className="product_title">{title}</h2>
            <small>
              <Rating
                className="rating"
                emptySymbol="fa fa-star-o "
                fullSymbol="fa fa-star"
                readonly
                initialRating={rating}
              />
            </small>
            <small className="product_code">Product Code: {pcode}</small>

            <small className="product_code mt-4">Brand: {brand}</small>
            <small className="product_code">Avilavility: {avilavility}</small>
            <h4 className="product_price"> &#36; {price}</h4>
            <div className="d-flex">
              <h5 className="product_quantity">{quantity}</h5>
              {/* Quantity icon */}
              <div className="quantitiy_icon">
                <small onClick={handleIncrease}>
                  <i class="fas fa-plus"></i>
                </small>
                <small onClick={handleDicrease}>
                  <i class="fas fa-minus"></i>
                </small>
              </div>
            </div>
            <div className="mt-2">
              <button className="add_to_cart_button" onClick={handleBuyPost}>
                Buy now
              </button>
              <button className="buy_button" onClick={handleBuyPost}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* product description */}
      </div>
      <div className="row py-5">
        <h4 className="text-start mb-0">Description</h4>
        <hr className="mt-3" />

        <div className="col-12 text-start">
          {description}
          {description}
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
