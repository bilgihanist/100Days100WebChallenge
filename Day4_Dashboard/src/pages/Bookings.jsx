import React from "react";
import "../styles/booking.css";
import CarItem from "../components/UI/CarItem";
import carData from '../assets/dummy-data/booking-cars.js'


const Bookings = () => {
  return (
    <div className="booking">
      <div className="booking__wrapper">
        <h2 className="booking__title">Booking</h2>
        <div className="filter__widget-wrapper">

          <div className="filter__widget-01">
            <select>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
     
          <div className="filter__widget-02">
            <select>
              <option value="supra">Supra</option>
              <option value="bmw">Bmw</option>
              <option value="honda">Honda</option>
            </select>
          </div>

        </div>
        <div className="booking__car-list">
          {
            carData.map((item) => (<CarItem item={item} key={item.id} />))
          }
        </div>
      </div>
    </div>
  );
};

export default Bookings;
