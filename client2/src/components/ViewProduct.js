import React, { useEffect, useState } from "react";
import AddCart from "./AddCart";
import AddQty from "./AddQty";
import Banner from "./Banner";
import SelectSize from "./SelectSize";
import SelectColor from "./SelectColor";
import { useLocation } from "react-router";

export default function ViewProduct(props) {
 let [prod_id, setProdId] = useState([props.prod_id]);
  const [prod_list, setList] = useState([]);
  const [prod_name, setProdName] = useState([]);
  const [size, setSize] = useState([]);
  const [amount, setAmount] = useState([]);
  let [color, setColor] = useState([props.color]);
  // const [prod_id, setProdId] = useState([]);
  const [cust_id, setCustId] = useState([]);
  const [prod_price, setProdPrice] = useState([]);

  // use location hook to get the prod_id
  // ex: "/viewproduct/P001/Black"
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  prod_id = location.pathname.split("/")[2];
  color = location.pathname.split("/")[3];

  const loadList = async () => {
    try {      

      const resp = await fetch(`http://localhost:5000/getProduct/${prod_id}`);
      // const resp = await fetch(`http://localhost:5000/getProduct/P001`);
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Response", resp);
      console.log("List: ", prod_list);
    } catch (err) {
      console.error(err.message);
    }
  };

  const insertCart = async (e) => {
    e.preventDefault();
    try {
      console.log(prod_id, color, size, amount);
      const bodyStr = { prod_id, color, size, amount };
      const resp = await fetch("http://localhost:4000/insertCart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyStr),
      });
      window.location = "/cart";
    } catch (err) {
      console.error(err.message);
    }
  };

  

  useEffect(() => {
    console.log("Enter useEffect");
    loadList();
  }, []);

  return (
    <div>
      {/* Featured Product start */}
      <section className="single-product">
        <div className="container">
          <form onSubmit={insertCart}>
            {prod_list.map((prod) => {
              // const prodLink = "/viewproduct/" + prod.prod_color_id;
              // console.log(prodLink);
              // setProdId(prod.prod_id); ERROR
              return (
                <>
                  <div className="row">
                    {/* image of shirt section */}
                    <div className="col-sm-4">
                      <div className="product-item">
                        <figure className="product-thumb">
                          {/* <img src={prod.image_url} alt="image shirt" width="100%" height="100%"/> */}
                          <img src={prod.image_url} />
                        </figure>
                        <div className="product-content">
                          <div className="ratings">
                            <a href="#">
                              <i className="ti-star" />
                            </a>
                            <a href="#">
                              <i className="ti-star" />
                            </a>
                            <a href="#">
                              <i className="ti-star" />
                            </a>
                            <a href="#">
                              <i className="ti-star" />
                            </a>
                            <a href="#">
                              <i className="ti-star" />
                            </a>
                          </div>
                          {/* <p className="price text-danger">฿{prod.prod_price}</p> */}
                        </div>
                      </div>
                    </div>

                    {/* Detail section */}
                    <div className="col-sm-6 text-left ml-5">
                      <div className="">
                        <h1 className="">{prod.prod_name}</h1>
                      </div>
                      <div className="">
                        <h5 className="prod_id">Product ID: {prod.prod_id}</h5>
                        {/* <h5 className="color">Color: {prod.color}</h5> */}

                        <div
                          className="form-group quantity"
                          onChange={(e) => {
                            setColor(e.target.value);
                          }}
                        >
                          <label
                            className="font-weight-bold h5 mr-3"
                            htmlFor="price"
                          >
                            Color:
                          </label>
                          <SelectColor prod_id={prod.prod_id} color={color} />
                          {/* <SelectSize /> */}
                        </div>
                        {/* <h5 className="size">
                          Size: <SelectSize onChange={(e) => {
                              setSize(e.target.value);
                            }}/>
                        </h5> */}
                        <div
                          className="form-group quantity"
                          onChange={(e) => {
                            setSize(e.target.value);
                          }}
                        >
                          <label
                            className="font-weight-bold h5 mr-3"
                            htmlFor="price"
                          >
                            Size:
                          </label>
                          <SelectSize prod_id={prod.prod_id} color={color} />
                          {/* <SelectSize /> */}
                        </div>
                        {/* <h5 className="quantity">
                          QTY: <AddQty />
                        </h5> */}
                        <div className="form-group quantity">
                          <label
                            className="font-weight-bold h5"
                            htmlFor="price"
                          >
                            Quantity:
                          </label>
                          {/* <h5 className="quantity d-inline">Quantity</h5> */}

                          <input
                            type="number"
                            className="form-control d-inline"
                            placeholder="Quantity"
                            id="qty"
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                          />
                        </div>
                        <h2 className="price text-danger">
                          ฿{prod.prod_price}
                        </h2>
                      </div>
                      {/* <button href="#" className="btn btn-success text-center">
                        Add to cart
                      </button> */}
                      <AddCart
                        prod_id={prod.prod_id}
                        color={color}
                        size={size}
                        sale_amount={amount}
                        prod_price={prod.prod_price}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </form>
        </div>
      </section>
      {/* Featured Product end */}
    </div>
  );
}
