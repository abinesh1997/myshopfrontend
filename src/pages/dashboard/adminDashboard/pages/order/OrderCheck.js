import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../../../../../redux/features/authSlice";
import AdminHeader from "../../AdminHeader";
import SideNav from "../../SideNav";
import { toast } from "react-toastify";
import "../../style.css";

const OrderCheck = () => {
  const { order } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getOrder(params.id));
    }
  }, [dispatch, params.id]);

  const handleStatusChange = (orderId, orderStatus) => {
    dispatch(
      updateOrder({ orderId: orderId, orderStatus: orderStatus, toast })
    );
  };

  return (
    <div className="dash_board">
      <div className="left">
        <SideNav />
      </div>
      <div className="right">
        <AdminHeader />
        <div className="admin_container order">
          <div className="change_order_status">
            <select
              name="status"
              className="form-control"
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              defaultValue={order.orderStatus}
            >
              <option>{order.orderStatus}</option>
              <option value="Not Process">Not Processed</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="order_container">
            <div className="order_details">
              <h3>Order Info</h3>
              <p>Order Id: {order._id}</p>
              <p>
                Date: <span>{moment(order.updatedAt).format("MMM Do YY")}</span>
                <span>
                  {moment(order.updatedAt).startOf("minute").fromNow()}
                </span>
              </p>
              <p>
                Order Status:
                {order.orderStatus === "Completed" ? (
                  <span
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {order.orderStatus}
                  </span>
                ) : order.orderStatus === "Cancelled" ? (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {order.orderStatus}
                  </span>
                ) : order.orderStatus === "Processing" ? (
                  <span
                    style={{
                      color: "oranged",
                      fontWeight: "bold",
                    }}
                  >
                    {order.orderStatus}
                  </span>
                ) : (
                  <span>{order.orderStatus}</span>
                )}
              </p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Payment Status: {order.isPaid ? <>Paid</> : <>Not Paid</>}</p>
            </div>
            <div className="delivery">
              <h3>Delivery Details</h3>
              <p>Name: {order.deliveryDetails?.name}</p>
              <p>Email: {order.deliveryDetails?.email}</p>
              <p>Country: {order.deliveryDetails?.country}</p>
              <p>Address: {order.deliveryDetails?.address}</p>
              <p>Post Code: {order.deliveryDetails?.postcode}</p>
            </div>
          </div>
          <h4 className="order_product">Ordered Product</h4>
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
              {order && order.products?.map((p) => (
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
    </div>
  );
};

export default OrderCheck;