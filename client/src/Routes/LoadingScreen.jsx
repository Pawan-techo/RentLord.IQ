import logo from "../assets/logo-mini.png";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-28 h-28 logo-beat"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-700 tracking-wide">
          RENTLORDIQ
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;