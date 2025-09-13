import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser, clearUser } from "./store/slices/authSlice";

import Home from "./pages/home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
// App.js
import "./App.css";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import VideoCard from "./components/CourseCard/VideoCard";
import CourseDetailsPage from "./components/details/CourseDetailsPage";



function App() {
const courses = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
    title: "React Basics",
    tag: "Free",
    tagBgColor: "bg-green-500",
    tagTextColor: "text-white",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
    title: "React Hooks in Depth",
    tag: "Premium",
    tagBgColor: "bg-purple-500",
    tagTextColor: "text-white",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
    title: "JavaScript ES6+ Features",
    tag: "New",
    tagBgColor: "bg-blue-500",
    tagTextColor: "text-white",
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
    title: "React Full Course",
    tag: "Trending",
    tagBgColor: "bg-red-500",
    tagTextColor: "text-white",
  },
  {
    id: 5,
    videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
    title: "JavaScript Crash Course",
    tag: "Free",
    tagBgColor: "bg-green-500",
    tagTextColor: "text-white",
  },
  {
    id: 6,
    videoUrl: "https://www.youtube.com/embed/ntLJmHOJ0ME",
    title: "Node.js Tutorial",
    tag: "Backend",
    tagBgColor: "bg-yellow-500",
    tagTextColor: "text-black",
  },
];

  const user = useSelector((state) => state.auth.currentUser);
  const isAdmin = user?.role === "admin";
  const dispatch = useDispatch();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(setUser({ id: firebaseUser.uid, ...docSnap.data() }));
        }
      } else {
        dispatch(clearUser());
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (checkingAuth) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
