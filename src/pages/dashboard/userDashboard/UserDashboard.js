import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../../../redux/features/authSlice";
import TopNav from "../../../components/header/TopNav";
import SecondHeader from "../../../components/header/SecondHeader";
import "./style.css";
import moment from "moment";
const UserDashboard = () => {
  const { user, userOrders } = useSelector((state) => state.auth);

  const userId = user?.user.Id;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getUserOrder(userId));
    }
  }, [dispatch, userId]);
  console.log(userOrders);
  return (
    <>
      <TopNav />
      <SecondHeader />
      <div className="user_dashboard">
        <h3>All Orders</h3>
        {userOrders &&
          userOrders.map((o) => (
            <div key={o._id} className="order_card">
              <div className="order_head">
                <h5>Order Status: {o.orderStatus}</h5>
<p>Date:{moment(o.updateAt).format("MMM Do YY")}</p>
                <p>Payment Status: {o.isPaid ? <>Paid</> : <>Not Paid</>}</p>
              </div>
              <hr />
              <div className="product_summary"> 
              <h5>Product Summary</h5>
              <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Ordered Quantity</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {o.products?.map((p) => (
                      <tr key={p._id}>
                        <td>{p.title}</td>
                        <td>
                          {" "}
                          <img
                            src={`${process.env.REACT_APP_API_IMAGE_URL}/${p.image}`}
                            height={80}
                            alt=""
                          />
                        </td>
                        <td>{p.pquantity}</td>
                        <td>$ {p.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

       
      </div>
    </>
  );
};

export default UserDashboard;
