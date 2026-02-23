import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/Auth/Action";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access authenticated user state and server-side errors
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes and clear field-specific error
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate login form inputs
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Dispatch login action with navigation callback
    dispatch(login(formData, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 bg-gradient-to-r from-sky-200 via-white to-rose-200">
      <div className="w-full m-6 md:m-0 max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to RentLordIQ
        </h2>

        {/* Display server-side authentication error */}
        {error && (
          <p className="text-sm text-red-600 text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-400 focus:border-indigo-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-400 focus:border-indigo-500"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">Don’t have an account?</p>

        <div className="flex justify-center mt-3 space-x-5">
          <button
            onClick={() => navigate("/register/landlord")}
            type="button"
            className="px-5 py-2 text-indigo-800 rounded-md hover:bg-indigo-100 font-medium border border-indigo-800 transition cursor-pointer"
          >
            Register As Landlord
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-10 py-2 border border-gray-500 hover:bg-gray-100 rounded-md transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
