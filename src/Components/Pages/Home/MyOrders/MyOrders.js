import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import MyOrder from "./MyOrder";

const MyOrders = () => {
  const { user } = useAuth();
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyOrder(data);
      });
  }, [user.email]);
  return (
    <div className="mt-2 container">
      {myOrder.length === 0 ? (
        <div>
          <img src="https://i.ibb.co/CsKCt7M/cogs.gif" alt="" />
        </div>
      ) : (
        <div className="row">
          {myOrder.map((productData) => (
            <MyOrder key={productData._id} productData={productData}></MyOrder>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
