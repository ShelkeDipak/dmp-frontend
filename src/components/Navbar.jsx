import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useMedications } from "../context/MedicationContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { medications } = useMedications();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setMenuOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const notifications = medications.map((m, i) => ({
    id: i,
    name: m.name,
    dose: m.dosage || m.dose || "",
    time: m.time || "",
  }));

  const userPhoto =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.displayName || user?.email || "User"
    )}&background=0D8ABC&color=fff`;

  const userName = user?.displayName || user?.email || "User";

  return (
    <>
      {/* 🌐 Navbar */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-12 py-4 bg-white shadow-sm z-[999]">
        {/* 🔔 Notifications */}
        <div className="flex items-center space-x-3">
          <button
            ref={notifRef}
            onClick={() => setShowNotifications((s) => !s)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition relative"
          >
            <Bell size={20} className="text-gray-700" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full" />
            )}
          </button>

          <h1
            className="text-base md:text-lg font-semibold text-blue-700 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Digital Medical Prescription
          </h1>

          {showNotifications && (
            <div className="absolute top-16 left-4 md:left-12 bg-white w-72 md:w-80 rounded-2xl shadow-xl border border-gray-200 z-[999]">
              <div className="p-3 border-b font-semibold">Notifications</div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b hover:bg-gray-50 transition"
                    >
                      <p className="font-medium text-gray-800">{n.name}</p>
                      <p className="text-sm text-gray-500">
                        {n.dose} {n.time && `• ${n.time}`}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 🖥️ Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-3">
            {[
              { to: "/", label: "Home" },
              { to: "/add-drug", label: "Add Drug" },
              { to: "/generate", label: "Generate Prescription" },
              { to: "/upload", label: "Upload Prescription" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-1 rounded-full bg-blue-500 text-white"
                    : "px-4 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="relative" ref={profileRef}>
            <img
              src={userPhoto}
              alt="profile"
              className="w-9 h-9 rounded-full border object-cover cursor-pointer"
              onClick={() => setShowProfileMenu((s) => !s)}
            />

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 bg-white rounded-xl shadow-lg border border-gray-200 w-56 py-1 z-[999]">
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate("/doctor-login")}
                      className="w-full px-4 py-2 text-left hover:bg-blue-100"
                    >
                      👨‍⚕️ Doctor Dashboard
                    </button>
                    <button
                      onClick={() => navigate("/patient-login")}
                      className="w-full px-4 py-2 text-left hover:bg-green-100"
                    >
                      🧑‍🤝‍🧑 Patient Dashboard
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                  >
                    👤 Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 📱 Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* 📱 Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[998] bg-black/40"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🧭 Top Navigation */}
            <div className="p-4 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4 text-blue-700">
                Menu
              </h2>
              <nav className="flex flex-col space-y-2">
                {[
                  { to: "/", label: "Home" },
                  { to: "/add-drug", label: "Add Drug" },
                  { to: "/generate", label: "Generate Prescription" },
                  { to: "/upload", label: "Upload Prescription" },
                  { to: "/contact", label: "Contact" },
                ].map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "py-2 px-3 rounded-md bg-blue-500 text-white"
                        : "py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700"
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

          
           {/* 👤 Bottom Profile Section */}
<div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
  <div className="flex items-center space-x-3">
    <img
      src={userPhoto}
      alt="profile"
      className="w-10 h-10 rounded-full border object-cover"
    />
    <div>
      <p className="font-medium text-gray-800 text-sm">
        {userName}
      </p>
      <p className="text-xs text-gray-500">
        {user ? "Logged in" : "Guest"}
      </p>
    </div>
  </div>

  {user ? (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => {
        navigate("/"); // 👈 Go to Home page instead of /login
        setMenuOpen(false); // close menu
      }}
      className="text-sm text-blue-600 hover:underline"
    >
      Login
    </button>
  )}
</div>

          </div>
        </div>
      )}
    </>
  );
}
