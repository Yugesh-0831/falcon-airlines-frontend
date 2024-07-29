import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAsync, selectLoggedInUser } from "./authSlice";
import { Link, Navigate } from "react-router-dom";
import { SiIndigo } from "react-icons/si";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div
        className="min-h-screen bg-cover bg-no-repeat bg-gray-100 flex flex-col justify-center sm:py-12"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/656116970/photo/blue-background.jpg?s=612x612&w=0&k=20&c=P7PWU0yK1Vc5y-0eexb96dCTSa7JS3fCKieY2G0dh9w=')",
        }}
      >
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="flex items-center justify-center m-4">
            <SiIndigo className="text-blue-800 font-bold text-4xl m-4" />
            <h1 className="font-bold text-2xl">Indigo</h1>
          </div>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form
              className="px-5 py-7"
              onSubmit={handleSubmit((data) => {
                dispatch(checkUserAsync(data));
              })}
            >
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                {...register("email")}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                type="text"
                {...register("password")}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-800 focus:bg-blue-800 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
              </button>
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  to="/signup"
                  className="font-semibold leading-6 text-blue-500 hover:text-blue-800"
                >
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
