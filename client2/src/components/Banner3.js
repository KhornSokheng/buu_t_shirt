import React from "react";
import { Carousel } from "react-bootstrap";


import image1 from "../im/1.png";
import image2 from "../im/2.png";
import image3 from "../im/3.png";

const Banner3 = () => {
  return (
    <div className="Homecss container">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" SRC={image1} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" SRC={image2} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" SRC={image3} alt="" />
        </Carousel.Item>
      </Carousel>
    </div>

  );
};
export default Banner3;