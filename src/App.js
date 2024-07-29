import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserFlights from "./pages/UserFlights";
import Login from "./features/auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setLoggedInUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Protected from "./features/auth/Protected";
import { fetchAllFlightsAsync } from "./features/flight/flightSlice";
import Flights from "./pages/Flights";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";
import AdminFlights from "./pages/AdminFlights";
import { io } from "socket.io-client";
import SignUp from "./features/auth/SignUp";
const socket = io.connect("http://localhost:8080");

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
    path: "/signup",
    element: <SignUp></SignUp>,
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

  // For Login Percistence ------>
  useEffect(() => {
    const storedUser = window.localStorage.getItem("USER");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setLoggedInUser(parsedUser));
      console.log("parsedUser: ", parsedUser);
    }
  }, []);

  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync(user._id));
      dispatch(fetchAllFlightsAsync());
      window.localStorage.setItem("USER", JSON.stringify(user));
    }
  }, [dispatch, user]);

  socket.on("flight_updated", (data) => {
    dispatch(fetchAllFlightsAsync());
    if (
      user &&
      user.flights.length > 0 &&
      data &&
      data.message &&
      data.message.flight &&
      user.flights.includes(data.message.flight._id)
    ) {
      toast.success(`${data.message.update}`, {
        position: "top-right",
        autoClose: false,
        closeButton: true,
      });
    }
  });

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
