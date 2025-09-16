import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Errors
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Validation
    const handleForm = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
            e.target.value.length === 0
                ? setNameError("Name is required")
                : setNameError("");
        }

        if (e.target.name === "email") {
            setEmail(e.target.value);
            e.target.value.length === 0
                ? setEmailError("Email is required")
                : emailRegex.test(e.target.value) === false
                    ? setEmailError('Email should be like "example@xxxx.com"')
                    : setEmailError("");
        }

        if (e.target.name === "password") {
            setPassword(e.target.value);
            e.target.value.length === 0
                ? setPasswordError("Password is required")
                : passwordRegex.test(e.target.value) === false
                    ? setPasswordError("Password must be at least 8 characters and contain uppercase, lowercase, numbers and special characters like @#$%^&*!")
                    : setPasswordError("");
        }

        if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
            e.target.value.length === 0
                ? setConfirmPasswordError("Confirm Password is required")
                : e.target.value !== password
                    ? setConfirmPasswordError("Passwords do not match")
                    : setConfirmPasswordError("");
        }
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !emailError &&
            !nameError &&
            !passwordError &&
            !confirmPasswordError &&
            email &&
            name &&
            password &&
            confirmPassword
        ) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // add to firestore
                await setDoc(doc(db, "users", user.uid), {
                    name,
                    email,
                    role: "student",
                    favorites: [],
                    wishlist: [],
                    joinedCourses: [],
                });

                // add to redux
                dispatch(setUser({
                    id: user.uid,
                    name,
                    email,
                    role: "student",
                    favorites: [],
                    wishlist: [],
                    joinedCourses: [],
                }));

                console.log("Signup successful!");
                navigate("/login");

                setEmail("");
                setName("");
                setPassword("");
                setConfirmPassword("");
            } catch (error) {
                console.error("Error signing up:", error.message);
            }
        }
    };

    return (
        <>
            <div className="min-h-70 bg-gray-50 flex items-center justify-center p-4">
                <div className="flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden bg-white shadow-2xl rounded-3xl">
                    {/* Left Side */}
                    <div className="lg:w-1/2 p-12 hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#FFC000] to-[#FF8A00]">
                        <h1 className="mt-8 text-6xl font-bold text-white text-center">Learnix</h1>
                        <h2 className="mt-8 text-4xl font-bold text-white text-center">
                            Start Your Learning Journey
                        </h2>
                        <p className="mt-4 text-white text-center text-lg">
                            Join thousands of students and unlock your potential with our engaging courses.
                        </p>
                    </div>

                    {/* Right Side - Sign Up Form */}
                    <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                                Create an Account
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Already have an account? <Link to="/login" className="text-[#FF8A00] hover:underline font-semibold">Login</Link>

                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={handleForm}
                                    name="name"
                                    className="px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                />
                                <p className="text-red-500">{nameError}</p>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    value={email}
                                    onChange={handleForm}
                                    name="email"
                                    className="px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                />
                                <p className="text-red-500">{emailError}</p>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="flex w-full">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handleForm}
                                        name="password"
                                        className="px-3 py-2 mt-1 flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="px-3 py-2 mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500-5"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <p className="text-red-500">{passwordError}</p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="flex w-full">
                                    <input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleForm}
                                        name="confirmPassword"
                                        className="px-3 py-2 mt-1 flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="px-3 py-2 mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500-5"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <p className="text-red-500">{confirmPasswordError}</p>
                            </div>

                            {/* Submit */}
                            <button
                                disabled={
                                    emailError || nameError || passwordError || confirmPasswordError
                                }
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#FFC000] hover:bg-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                            >
                                Sign Up
                            </button>

                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-500">
                                By clicking "Sign Up", you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
