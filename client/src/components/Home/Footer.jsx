import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center">
              <div className="h-16 w-48">
                <img
                  src={logo}
                  alt="RentLordIQ"
                  className="h-16 w-full object-cover scale-200"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A modern rental and property management platform built to simplify
              operations, automate rent, and keep everything under control.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white transition">Features</li>
                <li className="hover:text-white transition">Pricing</li>
                <li className="hover:text-white transition">How It Works</li>
                <li className="hover:text-white transition">Testimonials</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li
                  onClick={() => navigate("/about")}
                  className="hover:text-white transition cursor-pointer"
                >
                  About Us
                </li>
                <li className="hover:text-white transition">Careers</li>
                <li className="hover:text-white transition">Privacy Policy</li>
                <li className="hover:text-white transition">
                  Terms & Conditions
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-indigo-400" />
                rentlordiq.business@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-indigo-400" />
                +91 9XXXX XXXXX
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-indigo-400" />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} RentLordIQ. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with ❤️ by Pawan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;