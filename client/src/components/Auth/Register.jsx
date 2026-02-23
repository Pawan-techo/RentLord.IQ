import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, getUser } from "../../state/Auth/Action";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch();
  const { jwt, error, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Fetch authenticated user details after successful registration
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  // Display server-side registration errors
  useEffect(() => {
    if (error) {
      toast.error(error, { toastId: "register-error" });
    }
  }, [error]);

  // Handle post-registration success flow
  useEffect(() => {
    if (jwt) {
      toast.success("Registration successful 🎉", {
        toastId: "register-success",
      });

      setTimeout(() => {
        navigate("/landlord");
      }, 800);
    }
  }, [jwt, navigate]);

  // Handle registration form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: data.get("address"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
      role: "LANDLORD",
    };

    dispatch(register(userData));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 bg-gradient-to-r from-sky-200 via-white to-rose-200">
      <div className="w-full m-6 md:m-0 max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Landlord Account
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <textarea
            name="address"
            placeholder="Address"
            rows={4}
            required
            className="px-4 py-2 h-24 border border-gray-400 rounded-md resize-none focus:outline-none focus:border-indigo-500"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
