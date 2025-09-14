import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User, Heart, BookmarkPlus, BookOpen, LogOut, X } from 'lucide-react';
import { clearUser } from '../../store/slices/authSlice';

const UserSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSidebar(true);
    } else {
      // small timeout to allow animation
      const timer = setTimeout(() => setShowSidebar(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(clearUser());
    onClose();
  };

  const menuItems = [
    { id: 1, name: 'Dashboard', icon: User, path: '/dashboard', color: 'text-blue-600 hover:bg-blue-50' },
    { id: 2, name: 'My Courses', icon: BookOpen, path: '/courses', color: 'text-green-600 hover:bg-green-50' },
    { id: 3, name: 'Favorites', icon: Heart, path: '/favorites', color: 'text-red-600 hover:bg-red-50' },
    { id: 4, name: 'Wishlist', icon: BookmarkPlus, path: '/wishlist', color: 'text-purple-600 hover:bg-purple-50' },
  ];

  if (!showSidebar) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-20' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="relative mb-6">
          <button onClick={onClose} className="absolute top-0 left-0 p-1 hover:bg-gray-200 rounded-full">
            <X size={20} />
          </button>

          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <svg width="50" height="50" viewBox="0 0 100 100" className="text-orange-500">
                <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
                <path d="M50 20 L73 40 L65 70 L35 70 L27 40 Z" fill="currentColor"/>
                <circle cx="50" cy="45" r="10" fill="white"/>
                <text x="50" y="85" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">L</text>
              </svg>
              <span className="text-2xl font-bold text-gray-800">Learnix</span>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold">{currentUser?.name || 'User'}</h3>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${item.color} hover:shadow-md transition-all`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all"
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
