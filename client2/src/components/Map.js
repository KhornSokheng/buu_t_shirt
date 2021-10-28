import React from "react";

export default function Map() {
  return (
    // <section id="contacttan" className="content-wrapper container">
      <div className="contact00 container">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <div class="box-contact">
            <iframe
              width="100%"
              height="100%"
              title="map"
              className="absolute inset-0"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              style={{ filter: "opacity(0.8)" }}
              src="https://www.google.com/maps/embed/v1/search?q=มหาลัยบูรพา+จัน&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            />
          </div>
        </div>
      </div>
    // </section>
  );
}
