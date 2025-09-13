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
                    ? setEmailError("Invalid email format")
                    : setEmailError("");
        }

        if (e.target.name === "password") {
            setPassword(e.target.value);
            e.target.value.length === 0
                ? setPasswordError("Password is required")
                : passwordRegex.test(e.target.value) === false
                    ? setPasswordError("Password format error")
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
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={handleForm}
                        name="name"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                    <p>{nameError}</p>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleForm}
                        name="email"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                    <p>{emailError}</p>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handleForm}
                            name="password"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <p>{passwordError}</p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div>
                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleForm}
                            name="confirmPassword"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <p>{confirmPasswordError}</p>
                </div>

                {/* Submit */}
                <button
                    disabled={
                        emailError || nameError || passwordError || confirmPasswordError
                    }
                    type="submit"
                    className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Register
                </button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;
