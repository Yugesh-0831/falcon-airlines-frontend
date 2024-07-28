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

function UserFlights() {
  const user = useSelector(selectUserInfo);
  const flights = useSelector(selectAllFlights);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const userBookedFlights = flights.filter((flight) =>
    user.flights.includes(flight._id)
  );
  console.log("user: ", user);
  const dispatch = useDispatch();

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

  const handleUpdates = (flightId) => {
    if (selectedFlightId) setSelectedFlightId(null);
    else setSelectedFlightId(flightId);
  };

  return (
    <>
      <Navbar />
      <div>
        <ul role="list" className="divide-y">
          {userBookedFlights.map((flight) => (
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
                  {selectedFlightId && selectedFlightId === flight.flight_id ? (
                    <button
                      onClick={(e) => handleUpdates(flight.flight_id)}
                      className="bg-blue-800 text-white rounded-lg p-2"
                    >
                      Hide Updates
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleUpdates(flight.flight_id)}
                      className="bg-blue-800 text-white rounded-lg p-2"
                    >
                      Updates
                    </button>
                  )}
                </div>
              </div>
              {selectedFlightId && selectedFlightId === flight.flight_id && (
                <div className="mt-4">
                  <div className="text-lg font-semibold mb-2">Updates:</div>
                  <ul className="space-y-2">
                    {[...flight.updates].reverse().map((update, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-4 p-2 bg-blue-800 rounded-lg"
                      >
                        <div className="text-sm text-white">
                          {new Date(update.timestamp).toLocaleString()}
                        </div>
                        <div className="flex-1 text-sm text-white">
                          {update.message}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UserFlights;
