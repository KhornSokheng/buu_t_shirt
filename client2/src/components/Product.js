import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import SelectSize2 from "./SelectSize2";
import ViewIcon from "./ViewIcon";
import ViewProduct from "./ViewProduct";

export default function Product() {
  const [prod_list, setList] = useState([]);

  const loadList = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getProductColor");
      const jsonData = await resp.json();

      setList(jsonData);

      console.log("Response", resp);
      console.log("List: ", prod_list);
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
      <section className="feat-product">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="sec-heading">
                <h3 className="sec-title">All Product</h3>
              </div>
            </div>
          </div>

          <div className="row">
          {prod_list.map(prod => {
            // const prodLink="/viewproduct/"+prod.prod_color_id;
            // console.log(prodLink)
            return (
              
                <div className="col-sm-4 pb-2">
                  <div className="product-item">
                    <figure className="product-thumb">
                      <img
                        src= {prod.image_url}
                        alt
                      />
                      <div className="action-links">
                        {/* <a href="/viewproduct" className="quick-view icon">
                          <i className="ti-eye" />
                        </a> */}
                        <ViewIcon prod_id={prod.prod_id} color={prod.color} prod_color_id={prod.prod_color_id}/>
                        <a href="size" className="wishlist icon">
                          <i className="ti-write" />
                        </a>
                        {/* <a href="#" className="wishlist icon">
                                        <i className="ti-heart"/>
                                        </a> */}
                        <a href="/cart" className="add-cart icon">
                          <i className="ti-shopping-cart" />
                        </a>
                      </div>
                    </figure>
                    <div className="product-content">
                      <h5 className="product-name">
                        <a href="#">{prod.prod_name}</a>
                      </h5>
                      <h5 className="product-name">
                        <a href="#">{prod.color}</a>
                      </h5>
                      <SelectSize2 prod_id={prod.prod_id} color={prod.color} prod_color_id={prod.prod_color_id}/>
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
                      <p className="price text-danger">???{prod.prod_price}</p>
                    </div>
                  </div>
                </div>
              
            );
          })}
          </div>
        </div>
      </section>
      {/* Featured Product end */}
    </div>
  );
}
