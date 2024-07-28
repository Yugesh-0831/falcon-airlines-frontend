import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserInfo } from "../features/user/userSlice";
import { setLoggedInUser } from "../features/auth/authSlice";

function Navbar() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    window.localStorage.removeItem("USER");
    dispatch(setLoggedInUser(null));
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Indigo
            </div>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {user && user.role != "admin" ? (
                <li>
                  <Link
                    to="/my-flights"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent"
                    aria-current="page"
                  >
                    My Flights
                  </Link>
                </li>
              ) : null}
              <li>
                <div
                  onClick={handleSignOut}
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent"
                  aria-current="page"
                >
                  Sign Out
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
