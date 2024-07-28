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
    console.log(user.flights.findIndex((flightId) => flight._id === flightId));
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
      <div>
        <ul role="list" className="divide-y">
          {flights.map((flight) => (
            <div className="m-5">
              <div className="bg-gray-100 rounded-lg p-3">
                <li
                  key={flight.flight_id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-lg font-bold leading-6 text-gray-900">
                        {flight.flight_id}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        Arrival Gate: {flight.arrival_gate}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        Departure Gate: {flight.departure_gate}
                      </p>
                    </div>
                  </div>
                  <div className="sm:flex sm:flex-col sm:items-end">
                    <span
                      className={`${chooseColor(
                        flight.status
                      )} py-1 px-3 rounded-full text-xs`}
                    >
                      {flight.status}
                    </span>
                    <p className="text-sm leading-6 text-gray-900">
                      {flight.actual_arrival ? (
                        <>Arrival Time: {flight.actual_arrival}</>
                      ) : (
                        <>Arrival Time: {flight.scheduled_arrival}</>
                      )}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {flight.actual_departure ? (
                        <>Departure Time: {flight.actual_departure}</>
                      ) : (
                        <>Departure Time: {flight.scheduled_departure}</>
                      )}
                    </p>
                  </div>
                </li>
                <div className="flex justify-end mb-2">
                  <button
                    className="bg-blue-800 text-white rounded-lg p-2"
                    onClick={(e) => handleBooking(flight)}
                  >
                    Book Flight
                  </button>
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
