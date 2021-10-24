import React from "react";

export default function About() {
  return (
    <div className="container">
      <h1>Member</h1>

      <div class="card-deck">
        <div class="card">
          <img
            class="card-img-top"
            src="images/pictures9.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">MR.Khorn Sokheng</h5>
            <p class="card-text">Chief of officer</p>
          </div>
        </div>

        <div class="card">
          <img
            class="card-img-top"
            src="images/pictures8.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">นางสาวเจนจิรา ปิ่นแก้ว</h5>
            <p class="card-text">Secretary</p>
          </div>
        </div>

        <div class="card">
          <img
            class="card-img-top"
            src="images/pictures12.jfif"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">นายพงศกร จันทาพูน</h5>
            <p class="card-text">Developer</p>
          </div>
        </div>

        <div class="card">
          <img
            class="card-img-top"
            src="images/pictures10.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">นายธนกร บัวศรี</h5>
            <p class="card-text">engineering</p>
          </div>
        </div>

        <div class="card">
          <img
            class="card-img-top"
            src="images/pictures11.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">นายศุภศักดิ์ มณีพงศ์</h5>
            <p class="card-text">Technician</p>
          </div>
        </div>
      </div>

      <h3> What about us </h3>

      <font face="Comic sans MS" size=" 5">
        where product from ?
      </font>

      <p className="mt-3">
        <font face="Comic sans MS " size="5">
          {" "}
          our product come for manufacturer representive
        </font>
      </p>

      <img src="../../images/pictures1.jpg" />
      <h4>
        <font face="Comic sans MS" size=" 5">
          Integrity{" "}
        </font>
      </h4>
      <p5>
        <font face="comic sans MS" size="5">
          {" "}
          we have e-mail address for service
        </font>
      </p5>
      <p6>
        <img src="../../images/pictures3.jpg" />
      </p6>
      <h4>Inspiration</h4>
      <p6>
        <font face="comic sans MS" size="5">
          {" "}
          Start at chanthaburi campus to convenient public in region{" "}
        </font>
      </p6>
      <img src="images/pictures2.jpg" width="15" height="15" />
    </div>
  );
}
