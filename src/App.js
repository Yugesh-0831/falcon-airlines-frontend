import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserFlights from "./pages/UserFlights";
import Login from "./features/auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Protected from "./features/auth/Protected";
import { fetchAllFlightsAsync } from "./features/flight/flightSlice";
import Flights from "./pages/Flights";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";
import AdminFlights from "./pages/AdminFlights";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Flights></Flights>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/my-flights",
    element: (
      <Protected>
        <UserFlights></UserFlights>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminFlights></AdminFlights>
      </ProtectedAdmin>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync(user._id));
      dispatch(fetchAllFlightsAsync());
    }

    // const ws = new WebSocket("ws://localhost:8080");
    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   if (message.type === "FLIGHT_UPDATED") {
    //     dispatch(fetchAllFlightsAsync());
    //   }
    // };
    // return () => {
    //   ws.close();
    // };
  }, [dispatch, user]);

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
