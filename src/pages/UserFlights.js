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
import { SiIndigo } from "react-icons/si";
import { IoAirplaneSharp } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";

function UserFlights() {
  const user = useSelector(selectUserInfo);
  const flights = useSelector(selectAllFlights);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const userBookedFlights = flights.filter((flight) =>
    user.flights.includes(flight._id)
  );

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
      <div className="pb-6">
        {userBookedFlights.length > 0 ? (
          <>
            <div className="p-5 font-bold text-2xl">My Flights:</div>
            <ul role="list">
              {userBookedFlights.map((flight) => (
                <div key={flight.flight_id} className="m-5">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <li
                      className="flex justify-between gap-x-6 py-5"
                      key={flight.flight_id}
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <div className="flex items-center">
                            <SiIndigo />
                            <p className="text-sm sm:text-lg font-bold leading-6 text-gray-900 ml-2">
                              {flight.flight_id}
                            </p>
                          </div>
                          <p className="text-sm leading-6 text-gray-900 mt-4">
                            Arrival Gate: {flight.arrival_gate}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            Departure Gate: {flight.departure_gate}
                          </p>
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
                        <span
                          className={`${chooseColor(
                            flight.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {flight.status}
                        </span>
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
                            {flight.actual_departure ? (
                              <>{flight.actual_departure}</>
                            ) : (
                              <>{flight.scheduled_departure}</>
                            )}
                          </p>
                        </div>
                      </div>
                    </li>
                    <div className="flex justify-end mb-2">
                      {selectedFlightId &&
                      selectedFlightId === flight.flight_id ? (
                        <button
                          onClick={() => handleUpdates(flight.flight_id)}
                          className="bg-blue-900 text-white rounded-lg p-2"
                        >
                          Hide Updates
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdates(flight.flight_id)}
                          className="bg-blue-900 text-white rounded-lg p-2"
                        >
                          Updates
                        </button>
                      )}
                    </div>
                  </div>
                  {selectedFlightId &&
                    selectedFlightId === flight.flight_id && (
                      <div className="mt-4 pb-6">
                        {flight.updates.length > 0 ? (
                          <>
                            <div className="text-lg font-semibold mb-2">
                              Updates:
                            </div>
                            <ul className="space-y-2">
                              {[...flight.updates]
                                .reverse()
                                .map((update, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center space-x-4 p-2 bg-blue-900 rounded-lg"
                                  >
                                    <div className="text-sm text-white">
                                      {new Date(
                                        update.timestamp
                                      ).toLocaleString()}
                                    </div>
                                    <div className="flex-1 text-sm text-white">
                                      {update.message}
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </>
                        ) : (
                          <div className="text-lg font-semibold mb-2">
                            No Updates Found
                          </div>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-2xl font-bold m-6">No Flights Found</div>
        )}
      </div>
    </>
  );
}

export default UserFlights;
