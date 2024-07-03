import { FieldValues, useForm } from "react-hook-form";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../context/store";
//import Category from "./Category";

interface FormData {
  name: string;
  description: string;
}
interface Category {
  id: string;
  name: string;
}
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
var category: Category = {
  id: "-1",
  name: "please select category",
};
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

function Product() {
  const imagpath = "/src/assets/uploads/";
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<Product>();
  const state = store.getState();
  console.log("state: " + state.userReducer.users[0]);
  const user = state.userReducer.users[0];
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  const onSubmit = (data: FieldValues) => {
    console.log("modId : " + modId.id);
    if (modId.id.length != 0) {
      modId.name = data.name;
      modId.categoryId = data.categoryId;
      modId.price = data.price;
      modId.stockQuantity = data.stockQuantity;
      modId.description = data.description;
      onModify(modId);
    } else {
      console.log(data);
      axios
        .post("https://localhost:7160/api/Product", data, config)
        .then((res) => {
          console.log(res.data);
          setproductlist([...productlist, res.data]);
        });
    }
    setModId(product);
  };

  const [categorylist, setcategorylist] = useState([category]);
  const [productlist, setproductlist] = useState([product]);
  useEffect(() => {
    axios.get("https://localhost:7160/api/category", config).then((res) => {
      console.log(res.data);
      setcategorylist(res.data);
    });
    axios.get("https://localhost:7160/api/product", config).then((res) => {
      console.log(res.data);
      setproductlist(res.data);
    });
  }, []);

  const onDelete = (id: string) => {
    console.log("in delete", id);
    axios
      .delete("https://localhost:7160/api/product/" + id, config)
      .then((res) => {
        console.log(res.data);
        setproductlist([...productlist, res.data]);
      });
  };
  const [modId, setModId] = useState(product);
  const onModify = (cat: Product) => {
    console.log("in modify: " + cat.id + " " + cat.name);
    axios
      .put("https://localhost:7160/api/product/" + cat.id, cat, config)
      .then((res) => {
        console.log(res.data);
        setValue("name", "");
        setModId(product);
      });
  };
  const modify = (cat: Product) => {
    alert(cat.id + " " + cat.name);
    setValue("name", cat.name);
    setValue("description", cat.description);
    setValue("price", cat.price);
    setValue("stockQuantity", cat.stockQuantity);
    setValue("categoryId", cat.categoryId);
    setModId(cat);
  };

  function uploadFile(cat: Product) {
    console.log("cat" + cat.id);
    console.log("filestate", filestate);
    var formData = new FormData();
    formData.append("pfile", filestate, filestate.name);
    // formData.append("fileName", filestate.name);
    //const state = store.getState();
    //console.log("state: " + state.userReducer.users[0]);
    //const user = state.userReducer.users[0];
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `bearer ${user.token}`,
      },
    };
    axios
      .post("https://localhost:7160/api/upload/?id=" + cat.id, formData, config)
      .then((response) => {
        console.log(response.data);
      });
  }
  const [filestate, setfileState] = useState(Object);
  const onFileChange = (event: any) => {
    // Update the state
    var file = event.target.files[0];
    setfileState(file);
  };

  const [filedata, setfiledata] = useState("");
  const [fileda, setfileda] = useState("");
  const openFile = (evt: any) => {
    const fileObj = evt.target.files[0]; // We've not allowed multiple files.
    // See https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const reader = new FileReader();

    // Defining the function here gives it access to the fileObj constant.
    let fileloaded = (e: any) => {
      // e.target.result is the file's content as text
      // Don't trust the fileContents!
      // Test any assumptions about its contents!
      const fileContents = e.target.result;
      console.log("file object : " + fileObj);
      setfileda(fileObj);
      console.log(
        `File name: "${fileObj.name}". ` +
          `Length: ${fileContents.length} bytes.`
      );
      // Show first 80 characters of the file
      const first80char = fileContents.substring(0, 80);
      console.log(`First 80 characters of the file:\n${first80char}`);
      // Show the status messages
      //cwsd
      //uploadFile(cat);
    };

    // Mainline of the method
    //fileloaded = fileloaded.bind(this);
    // The fileloaded event handler is triggered when the read completes
    reader.onloadend = () => {
      console.log(reader.result);
      // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
      let idCardBase64 = "";
      getBase64(fileObj, (resulta: any) => {
        idCardBase64 = resulta;
        console.log("idCardBase64: ", idCardBase64);
        setfiledata(idCardBase64);
        setValue("filename", idCardBase64);
      });
    };
    reader.onload = fileloaded;
    reader.readAsDataURL(fileObj); // read the file
  };

  const getBase64 = (file: any, cb: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file); //for image
    //reader.readAsText(file); //for text
    //reader.readAsArrayBuffer(file);
    //reader.readAsBinaryString(file); //for 2d canvas design
    /**To start loading our file we have four methods:

    readAsArrayBuffer(file): Reads the file or blob as an array buffer. One use case is to send large files to a service worker.
    readAsBinaryString(file): Reads the file as a binary string
    readAsText(file, format): Reads the file as USVString (almost like a string), and you can specify an optional format.
    readAsDataURL(file): This will return a URL where you can access the file’s content, it is Base64 encoded 
    and ready to send to your server
 */
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  /**<div className="form-group col-3 m-2">
            <input type="hidden" {...register("filename", {})}></input>
            <img src={filedata} height={150} width={150}></img>
          </div>
          <div className="form-group col-3 m-2">
            <input
              type="file"
              className="hidden"
              multiple={false}
              accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
              onChange={(evt) => {
                openFile(evt);
              }}
            />
          </div> */

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <h1>Product</h1>
        <br></br>

        <form onSubmit={handleSubmit(onSubmit)} className="form-inline row">
          <div className="form-group row col-5 m-2">
            <label className="form-group col m-2" htmlFor="name">
              Please enter product name
            </label>

            <input
              id="name"
              className="form-control col m-2"
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors.name?.type === "required" && (
              <p>please enter product name.</p>
            )}
          </div>
          <div className="form-group row col-5 m-2">
            <label className="form-group col m-2" htmlFor="description">
              Please enter product description
            </label>

            <input
              id="description"
              className="form-control col m-2"
              {...register("description", {
                required: true,
                minLength: 4,
              })}
            />
            {errors.name?.type === "required" && (
              <p>please enter description.</p>
            )}
          </div>
          <div className="form-group row col-5 m-2">
            <label className="form-group col m-2" htmlFor="price">
              Please enter price
            </label>

            <input
              id="name"
              className="form-control col m-2"
              {...register("price", {
                required: true,
                minLength: 2,
              })}
            />
            {errors.name?.type === "required" && <p>please enter price.</p>}
          </div>
          <div className="form-group row col-5 m-2">
            <label className="form-group col m-2" htmlFor="stockquantity">
              Please enter stock quantity
            </label>

            <input
              id="name"
              className="form-control col m-2"
              {...register("stockQuantity", {
                required: true,
                minLength: 1,
              })}
            />
            {errors.name?.type === "required" && (
              <p>please enter stock quantity</p>
            )}
          </div>

          <div className="form-group col-3 m-2">
            <select
              id="categoryId"
              className="form-control col m-2"
              {...register("categoryId", {})}
            >
              <option value="-1">please select category</option>
              {categorylist.map((cat) => (
                <>
                  <option value={cat.id}>{cat.name}</option>
                </>
              ))}
            </select>

            {errors.name?.type === "required" && <p>please select category.</p>}
          </div>

          <br></br>
          <div className=" row m-2">
            <div className="col m-2">
              <button
                className="btn btn-info"
                onClick={() => {
                  setModId(product);
                  setValue("name", "");
                }}
              >
                Reset
              </button>
              <span className="col-3">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <button
                //  disabled={!isValid}
                type="submit"
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className=" container d-flex justify-content-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">srno</th>
              <th>name</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {productlist.map((cat) => (
              <>
                {cat != null ? (
                  <tr>
                    <td key={cat.id}>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.updatedDate}</td>
                    {cat.filename == "" ? (
                      <>
                        <td>
                          Add image
                          <input
                            type="file"
                            className="hidden"
                            multiple={false}
                            onChange={(evt) => {
                              onFileChange(evt);
                            }}
                          />
                          <button onClick={() => uploadFile(cat)}>
                            save image
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <img
                            src={imagpath + cat.filename}
                            height={100}
                            width={150}
                          ></img>
                        </td>
                      </>
                    )}

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
                ) : (
                  "no list available"
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
