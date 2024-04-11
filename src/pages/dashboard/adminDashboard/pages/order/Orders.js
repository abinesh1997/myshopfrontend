import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../AdminHeader";
import SideNav from "../../SideNav";
import "../../style.css";

import moment from "moment";
import { Link } from "react-router-dom";
import { getOrders } from "../../../../../redux/features/authSlice";

const Orders = () => {
    const [status, setStatus] = useState("");
    const { orders } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getOrders({ orderStatus: status }));
    }, [dispatch, status]);
    console.log(orders);

  return (
    
   <div className="dash_board">
        <div className="left">
          <SideNav />
        </div>
        <div className="right">
          <AdminHeader />
          <div className="admin_container order">
            <div className="order_status">
              <h4>Filter Order By OrderStatus:</h4>
              <select
                name="status"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Order Id</th>
                  <th>Date</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((o, i) => (
                    <tr key={o._id}>
                      <td>{i + 1}</td>
                      <td>{o._id}</td>
                      <td>
                        <span>{moment(o.updatedAt).format("MMM Do YY")}</span>
                        <br />
                        <span>
                          {moment(o.updatedAt).startOf("minute").fromNow()}
                        </span>
                      </td>
                      <td>
                        {
                          o.orderStatus === "Completed" ? (
                            <span
                              style={{
                                color: "green",
                                fontWeight: "bold",
                              }}
                            >
                              {o.orderStatus}
                            </span>
                          ) : o.orderStatus === "Cancelled" ? (
                            <span
                              style={{
                                color: "red",
                                fontWeight: "bold",
                              }}
                            >
                              {o.orderStatus}
                            </span>
                          ) : o.orderStatus === "Processing" ? (
                            <span
                              style={{
                                color: "oranged",
                                fontWeight: "bold",
                              }}
                            >
                              {o.orderStatus}
                            </span>
                          ) : (
                            <span>{o.orderStatus}</span>
                          )
                          // <span>{o.orderStatus}</span>
                        }
                      </td>
                      <td>{o.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                      <td>
                        <Link
                          to={`/admin/orders/${o._id}`}
                          className="view_order"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
  );
};

export default Orders;
