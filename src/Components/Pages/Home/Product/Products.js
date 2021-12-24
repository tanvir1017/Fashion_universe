import React from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import "./Product.css";

const Products = ({ productData }) => {
  const { img, name, price, rating, _id } = productData;

  return (
    <div className="col-lg-3 col-md-4 col-12">
      <div className="card_box">
        <div className="card_wrapper">
          <Link to={`/product/${_id}`}>
            <img src={img} className="img-fluid img" alt="" />
          </Link>
          <div className="card_body">
            <div className="overlay_icon">
              <button type="button" className="" title="Quick shop">
                <i className="fas fa-eye "></i>
              </button>
              <button type="button" className="" title="Add to wishlist">
                <i className="fas fa-heart "></i>
              </button>
              <button type="button" className="" title="Add to cart">
                <i className="fas fa-shopping-cart "></i>
              </button>
            </div>

            <div className="d-flex justify-content-around align-items-center mt-2">
              <Rating
                className="rating"
                emptySymbol="fa fa-star-o "
                fullSymbol="fa fa-star"
                readonly
                initialRating={rating}
              />
              <p className="fw-bold ">&#36; {price}</p>
            </div>
            <h4>{name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
