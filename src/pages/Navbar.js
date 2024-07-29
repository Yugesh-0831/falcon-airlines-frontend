import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserInfo } from "../features/user/userSlice";
import { setLoggedInUser } from "../features/auth/authSlice";
import { SiIndigo } from "react-icons/si";

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
        <div className="flex items-center justify-between p-6">
          <Link to="/">
            <div className="flex items-center ml-5">
              <SiIndigo className="text-white mr-3 font-bold text-2xl" />
              <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Indigo
              </div>
            </div>
          </Link>
          <div>
            <ul className="font-medium flex flex-row">
              {user && user.role != "admin" ? (
                <li>
                  <Link
                    to="/my-flights"
                    className="block py-2 px-3 text-white hover:text-gray-400 rounded md:bg-transparent"
                    aria-current="page"
                  >
                    My Flights
                  </Link>
                </li>
              ) : null}
              <li>
                <div
                  onClick={handleSignOut}
                  className="block py-2 px-3 text-white hover:text-gray-400 rounded md:bg-transparent"
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
