import { useEffect, useState } from "react";
import "./Sidebar.css";
import logo from "../assets/logo.ico";

function Sidebar() {
  const [sidestyle, setsidestyle] = useState(0);

  useEffect(() => {
    console.log(sidestyle);
  });
  return (
    <>
      <div id="mySidenav" className="sidenav" style={{ width: sidestyle }}>
        <a onClick={() => setsidestyle(0)}>&times;</a>
        <a href="/home">Home</a>
        <a href="/category">Category</a>
        <a href="/product">Product</a>
        <a href="/order">Order</a>
      </div>
      <button type="button" onClick={() => setsidestyle(225)}>
        <img src={logo} alt="logo" height={30} width={30} />
      </button>
    </>
  );
}

export default Sidebar;
