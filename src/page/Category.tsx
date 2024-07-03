import { FieldValues, set, useForm } from "react-hook-form";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { addUser } from "../context/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "../context/store";

interface Category {
  id: string;
  name: string;
  createdDate: string;
  updatedDate: string;
  userId: string;
  userName: string;
}

interface CategoryList {
  items: Category[];
}
var category: Category = {
  id: "",
  name: "",
  createdDate: "",
  updatedDate: "",
  userId: "",
  userName: "",
};

function Category() {
  //const data = useSelector((state: any) => state.users);
  const state = store.getState();
  console.log("state: " + state.userReducer.users[0]);
  const user = state.userReducer.users[0];
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<Category>();
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const onSubmit = (data: FieldValues) => {
    console.log("modId : " + modId.id);
    setValue("userName", user.username);
    setValue("userId", user.id);

    console.log("config: " + config);
    if (modId.id.length != 0) {
      modId.name = data.name;

      onModify(modId);
    } else {
      console.log(data);
      var a = (axios.defaults.headers.common = {
        Authorization: `bearer ${user.token}`,
      });
      axios
        .post("https://localhost:7160/api/category", data, config)
        .then((res) => {
          console.log(res.data);
          setcategorylist([...categorylist, res.data]);
        });
    }
    setModId(category);
  };

  const [categorylist, setcategorylist] = useState([category]);
  useEffect(() => {
    console.log("config: " + config.headers.Authorization);
    axios.get("https://localhost:7160/api/category", config).then((res) => {
      console.log(res.data);
      setcategorylist(res.data);
    });
  }, []);

  const onDelete = (id: string) => {
    console.log("in delete", id);
    axios
      .delete("https://localhost:7160/api/category/" + id, config)
      .then((res) => {
        console.log(res.data);
        setcategorylist([...categorylist, res.data]);
      });
  };
  const [modId, setModId] = useState(category);
  const onModify = (cat: Category) => {
    console.log("in modify: " + cat.id + " " + cat.name);
    axios
      .put("https://localhost:7160/api/category/" + cat.id, cat, config)
      .then((res) => {
        console.log(res.data);
        setValue("name", "");
        setModId(category);
      });
  };
  const modify = (cat: Category) => {
    alert(cat.id + " " + cat.name);
    setValue("name", cat.name);
    setModId(cat);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="d-flex justify-content-right">
          <div className="col-4"></div>
          <div className="col-4">
            <h1>Category</h1>
            <br></br>
            <div className="col-9">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-control" htmlFor="name">
                    Please enter category name
                  </label>
                  <br></br>
                  <input
                    id="name"
                    className="form-control"
                    {...register("name", { required: true, minLength: 4 })}
                  />
                  {errors.name?.type === "required" && (
                    <p>please enter category name.</p>
                  )}
                </div>
                <br></br>
                <div>
                  <div className="col">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setModId(category);
                        setValue("name", "");
                      }}
                    >
                      Reset
                    </button>
                    <span className="col-3">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="btn btn-success"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">srno</th>
                <th>name</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {categorylist.map((cat) => (
                <>
                  <tr>
                    <td key={cat.id}>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.updatedDate}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => modify(cat)}
                      >
                        Modify
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Category;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
