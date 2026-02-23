import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import Home from "../Pages/Home";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import AcceptInvitation from "../components/tenant/AcceptInvitation";
import AcceptExistingInvite from "../components/tenant/AcceptExistingInvite";
import BookDemo from "../components/Home/BookDemo";
import About from "../components/Home/About";

const HomeRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register/landlord" element={<Register />}></Route>
        <Route path="/set-password" element={<AcceptInvitation />}/>
        <Route path="/accept-existing" element={<AcceptExistingInvite />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};
export default HomeRoutes;
