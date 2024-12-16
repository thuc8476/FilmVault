import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo Section */}
          <div>
            <img src="/images/logo.png" alt="FilmVault" className="h-10" />
            <p>Your ultimate movie database.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li className="mb-1">
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="flex items-center">
              <MdEmail className="mr-2" />
              support@filmvault.com
            </p>
            <p className="flex items-center">
              <MdPhone className="mr-2" />
              +123 456 789
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="hover:text-gray-400 flex items-center space-x-1"
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a
                href="#"
                className="hover:text-gray-400 flex items-center space-x-1"
              >
                <FaTwitter />
                <span>Twitter</span>
              </a>
              <a
                href="#"
                className="hover:text-gray-400 flex items-center space-x-1"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
          &copy; 2024 FilmVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
