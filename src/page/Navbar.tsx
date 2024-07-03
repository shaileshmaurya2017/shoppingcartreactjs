import { useDispatch } from "react-redux";
import "./Navbar.css";
import Sidebar from "./Sidebar";
import { clearcart, removeUser } from "../context/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { store } from "../context/store";
import axios from "axios";

function Navbar() {
  const imagpath = "/src/assets/uploads/";
  interface Product {
    id: string;
    name: string;
    description: string;
    filename: string;
    stockQuantity: string;
    price: string;
    categoryId: string;
    createdDate: string;
    updatedDate: string;
  }
  var product: Product = {
    id: "",
    name: "",
    createdDate: "",
    updatedDate: "",
    description: "",
    filename: "",
    stockQuantity: "",
    price: "",
    categoryId: "",
  };
  interface Cart {
    productid: string;
    qty: string;
    price: string;
  }
  var cartvar: Cart = {
    productid: "",
    qty: "",
    price: "",
  };

  const state = store.getState();
  console.log("state: " + state.userReducer.users[0]);
  const user = state.userReducer.users[0];
  const cartlist = state.userReducer.cart;
  const [cart, setcartlist] = useState([cartvar]);
  const [productlist, setproductlist] = useState([product]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartdisplay, setcartdisplay] = useState("none");
  const showcart = () => {
    const state = store.getState();
    setcartlist(state.userReducer.cart);
    if (cartdisplay === "block") {
      setcartdisplay("none");
    } else {
      setcartdisplay("block");
    }
  };

  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };

  useEffect(() => {
    axios.get("https://localhost:7160/api/product", config).then((res) => {
      console.log(res.data);

      setproductlist(res.data);
    });
    setcartlist(state.userReducer.cart);
    // console.log("cart.length: " + cart.length);
  }, [state, cart]);

  // document.onclick = function (e) {
  //   console.log("e: " + e.target);
  //   let cartdiv = document.getElementById("cartdiv");
  //   //cartdiv = document.getElementById("cartdiv");
  //   //&& e.target?.parentNode != cartdiv
  //   if (e.target != cartdiv) {
  //     setcartdisplay("none");
  //   } else {
  //     setcartdisplay("block");
  //   }
  //   //  setcartdisplay("none");
  // };

  const carttotal = () => {
    let total = 0;
    let i = 0;
    cart.map((car) =>
      productlist.map((product) => {
        if (car.productid === product.id) {
          total += parseInt(car.qty) * parseInt(product.price);
        }
      })
    );

    return total;
  };

  interface Order {
    qty: string;
    price: string;
    productId: string;
  }
  var order: Order = {
    qty: "",
    price: "",
    productId: "",
  };

  const placeorder = () => {
    /* axios
      .post(
        "https://localhost:7160/api/order",
        { userId: user.id, cart: cart },
        config
      )
      .then((res) => {
        console.log(res.data);
      });*/
    dispatch(clearcart([]));
    setcartlist([]);
  };

  return (
    <>
      <div className="topnav">
        <a className="active" href="#home" style={{ float: "left" }}>
          <Sidebar></Sidebar>
        </a>

        <button
          onClick={() => {
            dispatch(removeUser(""));
            navigate("/");
          }}
          className="btn btn-danger"
        >
          Signout
        </button>
        <button
          onClick={() => {
            showcart();
          }}
          className="btn btn-warning"
          id="c1"
        >
          Cart
        </button>
        <a href="#contact">Contact</a>
      </div>
      <>
        <div
          id="cartdiv"
          className="card"
          style={{
            width: "25rem",
            display: cartdisplay,
            position: "absolute",
            top: "90px",
            right: "30px",
          }}
        >
          <ul className="list-group list-group-flush">
            <table className="table table-striped">
              <thead>
                {" "}
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>*</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.length == 0 ? (
                  <>
                    <tr>no items</tr>
                  </>
                ) : (
                  <></>
                )}
                {cart.map((car) =>
                  productlist.map((product) =>
                    car.productid === product.id ? (
                      <>
                        <tr>
                          <td key={product.id}>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>
                            <span>x</span>
                          </td>
                          <td>{car.qty}</td>
                          <td>{parseInt(car.qty) * parseInt(product.price)}</td>
                        </tr>
                      </>
                    ) : cart.length == 0 ? (
                      <>
                        <tr>no items</tr>
                      </>
                    ) : (
                      <></>
                    )
                  )
                )}
                {cart.length != 0 ? (
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total amount: </td>
                      <td>{carttotal()}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td>
                        {" "}
                        <button
                          onClick={() => {
                            placeorder();
                            dispatch(clearcart([{}]));
                            const state = store.getState();
                            setcartlist(state.userReducer.cart);
                          }}
                          className="btn btn-success"
                          id="c1"
                        >
                          Place Order
                        </button>
                      </td>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </ul>
        </div>
      </>
    </>
  );
}
export default Navbar;
