import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookDemo = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Request submitted successfully 🎉");

    setEmail("");

    // Redirect to home page after successful submission
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-r to-rose-200 via-white from-sky-200 px-4">
      <div className="bg-white border border-gray-300 shadow-xl rounded-xl w-full max-w-md p-10">
        <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">
          Book a Demo
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Enter your email and our team will contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition cursor-pointer"
          >
            Submit
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-200 border border-gray-600 py-3 hover:bg-gray-300 rounded-md font-medium transition cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BookDemo;