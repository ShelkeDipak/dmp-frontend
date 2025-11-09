// src/pages/Contact.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Reusable Navbar

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 🧾 Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Contact Our Team
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* 🏢 Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Address:</strong> 123 Business Street, Pune, India
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> support@askimtech.com
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p className="text-gray-600">
              <strong>Working Hours:</strong> Mon - Sat, 9:00 AM - 6:00 PM
            </p>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.5094941495346!2d73.85625531536302!3d18.520430687401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1b1b1b1b1b1%3A0x1234567890abcdef!2sPune!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
              width="100%"
              height="250"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}
