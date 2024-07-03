import axios from "axios";
import { useEffect, useState } from "react";
interface User {
  id: any;
  name: string;
  password: string;
  createDate: string;
  updatedate: string;
}
interface Props {
  items: User[];
}
function List({ items }: Props) {
  // const [list1, setlist] = useState([]);
  const newuser: User = {
    id: 0,
    name: "LoginId",
    password: "Password",
    createDate: "",
    updatedate: "",
  };
  var list: Array<User> = [newuser];
  useEffect(() => {
    axios.get("https://localhost:7160/api/category").then((res) => {
      console.log(res.data);
      list = res.data;
      items = res.data;
    });
  });
  return (
    <>
      <h1>in list</h1>
      <ul>
        {items.map((cat) => (
          <>
            <li key={cat.id}>{cat.password}</li>
            <li>{cat.name}</li>
            <li>{cat.createDate}</li>
          </>
        ))}
        <li></li>
      </ul>
    </>
  );
}

export default List;
