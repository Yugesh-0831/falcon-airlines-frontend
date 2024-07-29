import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchAllFlightsAsync,
  selectAllFlights,
  updateFlightScheduleAsync,
} from "../features/flight/flightSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { IoAirplaneSharp } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";
import { SiIndigo } from "react-icons/si";
import { IoMdCheckmark } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";

function Flights() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const flights = useSelector(selectAllFlights);

  const chooseColor = (status) => {
    switch (status) {
      case "On Time":
        return "bg-green-200 text-green-600";
      case "Delayed":
        return "bg-yellow-200 text-yellow-600";
      case "Cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-green-200 text-green-600";
    }
  };

  const handleBooking = (flight) => {
    if (user.flights.findIndex((flightId) => flight._id === flightId) < 0) {
      const updatedUser = { ...user, flights: [...user.flights] };
      updatedUser.flights.push(flight._id);
      dispatch(updateUserAsync(updatedUser));
      const updatedFlight = { ...flight, users: [...flight.users] };
      updatedFlight.users.push(user._id);
      dispatch(updateFlightScheduleAsync(updatedFlight));
    } else {
      console.log("flight already booked");
    }
  };

  if (user && user.role === "admin") {
    return <Navigate to="/admin" replace={true}></Navigate>;
  }

  return (
    <>
      <Navbar />
      <div className="pb-6">
        <ul role="list">
          {flights.map((flight) => (
            <div className="m-5">
              <div className="bg-gray-50 rounded-lg pl-1 p-3">
                <li
                  key={flight.flight_id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <div className="flex items-center">
                        <SiIndigo />
                        <p className="text-sm sm:text-lg font-bold leading-6 text-gray-900 ml-2">
                          {flight.flight_id}
                        </p>
                      </div>
                      <div className="flex items-center mt-3 ml-2 sm:ml-4">
                        <FaRupeeSign />
                        <p className="text-sm sm:text-xl leading-6 text-gray-900">
                          {flight.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-bold leading-6 text-gray-900 ml-2">
                      {flight.source}
                    </p>
                    <IoAirplaneSharp className="ml-3 md:ml-5 hidden sm:block" />
                    <HiArrowLongRight className="m-1 md:m-3" />
                    <IoAirplaneSharp className="mr-3 md:mr-5 hidden sm:block" />
                    <p className="text-sm font-bold leading-6 text-gray-900">
                      {flight.destination}
                    </p>
                  </div>
                  <div className="sm:flex sm:flex-col sm:items-end">
                    <div className="md:flex md:items-center">
                      <p className="text-sm font-bold leading-6 text-gray-900">
                        Arrival Time:
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {flight.actual_arrival ? (
                          <>{flight.actual_arrival}</>
                        ) : (
                          <>{flight.scheduled_arrival}</>
                        )}
                      </p>
                    </div>
                    <div className="md:flex md:items-center">
                      <p className="text-sm font-bold leading-6 text-gray-900">
                        Departure Time:
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {flight.actual_arrival ? (
                          <>{flight.actual_departure}</>
                        ) : (
                          <>{flight.scheduled_departure}</>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
                <div className="flex justify-end mb-2">
                  {user &&
                  user.flights.length &&
                  user.flights.includes(flight._id) ? (
                    <button className="bg-blue-900 text-white rounded-lg p-2 flex items-center">
                      <p>Booked</p>
                      <IoMdCheckmark />
                    </button>
                  ) : (
                    <button
                      className="bg-blue-900 text-white rounded-lg p-2 "
                      onClick={(e) => handleBooking(flight)}
                    >
                      Book Flight
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Flights;
