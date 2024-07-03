import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import List from "./page/List";
import axios from "axios";
import Login from "./page/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
//import store from "./context/store";
import { persistor, store } from "./context/store";
import Category from "./page/Category";
import Product from "./page/Product";
import Order from "./page/Order";
import Home from "./page/Home";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login></Login>}></Route>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route path="/category" element={<Category></Category>}></Route>
              <Route path="/product" element={<Product></Product>}></Route>
              <Route path="/order" element={<Order></Order>}></Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
