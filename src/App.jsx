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

import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Favorites from "./pages/Favorites";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
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
    <div className="mx-auto px-4">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Main Pages */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/details/:id" element={<CourseDetails />} />
        <Route
          path="/favorites"
          element={user ? <Favorites /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/wishlist"
          element={user ? <Wishlist /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  </div>
  );
}

export default App;
