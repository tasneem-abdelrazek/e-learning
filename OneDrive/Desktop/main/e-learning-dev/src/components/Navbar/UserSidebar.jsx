import { Link } from "react-router-dom";
import { User, Heart, BookmarkPlus, BookOpen, LogOut, X } from "lucide-react";

const UserSidebar = ({ isOpen, onClose, currentUser, onLogout }) => {
  const menuItems = [
    { id: 1, name: "Dashboard", icon: User, path: "/dashboard", color: "text-blue-800", hover: "hover:bg-blue-100" },
    { id: 2, name: "My Courses", icon: BookOpen, path: "/courses", color: "text-green-800", hover: "hover:bg-green-100" },
    { id: 3, name: "Favorites", icon: Heart, path: "/favorites", color: "text-red-700", hover: "hover:bg-red-100" },
    { id: 4, name: "Wishlist", icon: BookmarkPlus, path: "/wishlist", color: "text-purple-800", hover: "hover:bg-purple-100" },
  ];

  if (currentUser?.role === "admin") {
    menuItems.push({
      id: 5,
      name: "Admin Dashboard",
      icon: User,
      path: "/admin/dashboard",
      color: "text-yellow-800",
      hover: "hover:bg-yellow-100",
    });
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-30 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-white/90 to-white/100 backdrop-blur-lg shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300 rounded-l-3xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="relative mb-6">
          <button
            onClick={onClose}
            className="absolute top-0 left-0 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center mt-4">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <User size={36} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{currentUser?.name || "User"}</h3>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>

        <nav className="flex-1 mt-6">
          <div className="space-y-3">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${item.color} ${item.hover} hover:shadow-lg hover:scale-105 transition-all duration-200`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-gray-800">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="mt-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-200 hover:bg-red-300 text-red-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
