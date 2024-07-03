import Navbar from "./Navbar";
import { addtocart, clearcart, removefromcart } from "../context/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { store } from "../context/store";
function Home() {
  const imagpath = "/src/assets/uploads/";
  const dispatch = useDispatch();
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

  interface ProductList {
    items: Product[];
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

  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  //const [categorylist, setcategorylist] = useState([category]);
  const [productlist, setproductlist] = useState([product]);
  useEffect(() => {
    axios.get("https://localhost:7160/api/product", config).then((res) => {
      console.log(res.data);

      setproductlist(res.data);
    });
    setcartlist(state.userReducer.cart);
    console.log("cart.length: " + cart.length);
  }, [state, cart]);

  const getqty = () => {
    let qty = 0;
    cart.map((car) =>
      car.productid === product.id ? (
        <>
          <span>{(qty = parseInt(car.qty))}</span>
        </>
      ) : (
        <>
          <span>{}</span>
        </>
      )
    );
    return <span>{qty}</span>;
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <button
          onClick={() => {
            dispatch(clearcart([{}]));
            const state = store.getState();
            setcartlist(state.userReducer.cart);
            // window.location.reload();
          }}
          className="btn btn-warning"
        >
          clear cart
        </button>
        <div className="row">
          {productlist.map((product) => (
            <>
              <div className="col-3 mt-3">
                <div className="card" style={{ width: "15rem" }}>
                  <img
                    className="card-img-top"
                    src={imagpath + product.filename}
                    width="50px"
                    height="180px"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">{product.stockQuantity}</p>
                    <p className="card-text">{product.price}</p>

                    <button
                      onClick={() => {
                        let q1 = 0;
                        cart.map((car) => {
                          car.productid === product.id ? (
                            (q1 = parseInt(car.qty))
                          ) : (
                            <></>
                          );
                        });
                        dispatch(
                          addtocart({
                            id: product.id,
                            qty:
                              q1 < parseInt(product.stockQuantity)
                                ? q1 + 1
                                : q1,
                            price: product.price,
                          })
                        );
                        const state = store.getState();
                        setcartlist(state.userReducer.cart);
                        //window.location.reload();
                      }}
                      className="btn btn-primary"
                    >
                      Add
                    </button>

                    {state.userReducer.cart.map((car) =>
                      car.productid === product.id ? (
                        <>
                          <span>{car.qty}</span>
                        </>
                      ) : (
                        <>
                          <span>{}</span>
                        </>
                      )
                    )}

                    <button
                      onClick={() => {
                        let q1 = 0;
                        cart.map((car) => {
                          car.productid === product.id ? (
                            (q1 = parseInt(car.qty))
                          ) : (
                            <></>
                          );
                        });
                        dispatch(
                          removefromcart({
                            id: product.id,
                            qty: q1 != 0 ? q1 - 1 : 0,
                            price: product.price,
                          })
                        );
                        const state = store.getState();
                        setcartlist(state.userReducer.cart);
                        //window.location.reload();
                      }}
                      className="btn btn-danger"
                    >
                      clear cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
/**{cart.map((car) =>
                      car.productid !== product.id ? (
                        <>
                          <button
                            onClick={() => {
                              let q1 = 0;
                              q1 = parseInt(car.qty);
                              dispatch(
                                addtocart({
                                  id: product.id,
                                  qty: q1 + 1,
                                })
                              );
                              setcartlist(state.userReducer.cart);
                              window.location.reload();
                            }}
                            className="btn btn-primary"
                          >
                            Add
                          </button>
                        </>
                      ) : (
                        <>
                          <span>{car.qty}</span>
                          <button
                            onClick={() => {
                              let q1 = 0;
                              q1 = parseInt(car.qty);
                              dispatch(
                                removefromcart({
                                  id: product.id,
                                  qty: q1 + 1,
                                })
                              );
                              setcartlist(state.userReducer.cart);
                              window.location.reload();
                            }}
                            className="btn btn-danger"
                          >
                            clear cart
                          </button>
                        </>
                      )
                    )} */
export default Home;
