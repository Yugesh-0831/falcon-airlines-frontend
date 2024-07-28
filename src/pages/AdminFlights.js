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
import Navbar from "./Navbar";

function AdminFlights() {
  const dispatch = useDispatch();
  const flights = useSelector(selectAllFlights);
  useEffect(() => {
    dispatch(fetchAllFlightsAsync());
  }, [dispatch, flights]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const handleFlightUpdate = (flight_id) => {
    if (selectedFlightId) setSelectedFlightId(null);
    else setSelectedFlightId(flight_id);
  };
  const notify = () => {
    toast("Flight details updated successfully!");
  };

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
                  {selectedFlightId &&
                  selectedFlightId === flight.flight_id ? null : (
                    <button
                      onClick={(e) => handleFlightUpdate(flight.flight_id)}
                      className="bg-blue-800 text-white rounded-lg p-2"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              {/* Form component */}
              {selectedFlightId && selectedFlightId === flight.flight_id && (
                <div className="m-5">
                  <form
                    onSubmit={handleSubmit((data) => {
                      const updatedFlight = {
                        ...flight,
                        updates: [...flight.updates],
                      };
                      updatedFlight.arrival_gate = data.arrival_gate;
                      updatedFlight.departure_gate = data.departure_gate;
                      updatedFlight.scheduled_arrival = data.scheduled_arrival;
                      updatedFlight.scheduled_departure =
                        data.scheduled_departure;
                      updatedFlight.updates.push({ message: data.message });
                      updatedFlight.message = data.message;
                      console.log("updated flight :", updatedFlight);

                      dispatch(updateFlightScheduleAsync(updatedFlight));
                      setSelectedFlightId(null);
                      notify();
                    })}
                  >
                    <div className="md:flex md:justify-between">
                      <div>
                        <div>
                          <label
                            htmlFor="arrival_gate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Arrival Gate
                          </label>
                          <input
                            id="arrival_gate"
                            {...register("arrival_gate")}
                            name="arrival_gate"
                            type="text"
                            placeholder={flight.arrival_gate}
                            defaultValue={flight.arrival_gate}
                            className="border border-black rounded-md p-2"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="departure_gate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Departure Gate
                          </label>
                          <input
                            id="departure_gate"
                            name="departure_gate"
                            {...register("departure_gate")}
                            type="text"
                            placeholder={flight.departure_gate}
                            defaultValue={flight.departure_gate}
                            className="border border-black rounded-md p-2"
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="scheduled_arrival"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Arrival Time
                          </label>
                          <input
                            id="scheduled_arrival"
                            name="scheduled_arrival"
                            {...register("scheduled_arrival")}
                            type="text"
                            placeholder={flight.scheduled_arrival}
                            defaultValue={flight.scheduled_arrival}
                            className="border border-black rounded-md p-2"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="scheduled_departure"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Departure Time
                          </label>
                          <input
                            id="scheduled_departure"
                            name="scheduled_departure"
                            {...register("scheduled_departure")}
                            type="text"
                            placeholder={flight.scheduled_departure}
                            defaultValue={flight.scheduled_departure}
                            className="border border-black rounded-md p-2"
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="flight_status"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Flight Status
                          </label>
                          <select
                            id="flight_status"
                            name="flight_status"
                            defaultValue={flight.status}
                            {...register("status")}
                            className="border border-black rounded-md p-2"
                          >
                            <option value="On Time">On Time</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Message
                      </label>
                      <input
                        id="message"
                        name="message"
                        {...register("message")}
                        type="text"
                        placeholder="Please enter your message here"
                        className="border border-black rounded-md p-2 w-full"
                      />
                    </div>

                    <div className="flex justify-end mb-2 mt-2">
                      <button
                        onClick={(e) => handleFlightUpdate(flight.flight_id)}
                        className="bg-red-500 text-white rounded-lg p-2 mr-5"
                      >
                        Cancel
                      </button>
                      <button className="bg-blue-800 text-white rounded-lg p-2">
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminFlights;
