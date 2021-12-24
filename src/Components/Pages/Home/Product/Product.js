import React, { useEffect, useState } from "react";
import Products from "./Products";

const Product = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  return (
    <div className="mt-2 container">
      {product.length === 0 ? (
        <div>
          <img src="https://i.ibb.co/CsKCt7M/cogs.gif" alt="" />;
        </div>
      ) : (
        <div className="row">
          {product.map((productData) => (
            <Products
              key={productData._id}
              productData={productData}
            ></Products>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
