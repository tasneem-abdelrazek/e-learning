import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleForm = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;

        if (e.target.name === "email") {
            setEmail(e.target.value);
            e.target.value.length === 0
                ? setEmailError("Email is required")
                : emailRegex.test(e.target.value) === false
                    ? setEmailError("Invalid email format")
                    : setEmailError("");
        } else {
            setPassword(e.target.value);
            e.target.value.length === 0
                ? setPasswordError("Password is required")
                : e.target.value.length < 8
                    ? setPasswordError("Password should be more than 8 chars")
                    : setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");

        try {
            // login from Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // get user data from firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();

                // store to Redux
                dispatch(setUser({ id: user.uid, ...userData }));

                console.log("Login successful!");

                // redirect => role
                if (userData.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }

            } else {
                setLoginError("User data not found in Firestore");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setLoginError("Invalid email or password");
        }

        setEmail("");
        setPassword("");
    };


    return (
        <div className="">
            <div className="">
                <h2 className="">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="">
                        <label htmlFor="email" className="">Email</label>
                        <input
                            id="email"
                            type="text"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            value={email}
                            onChange={handleForm}
                            name="email"
                        />
                        <p className="">{emailError}</p>
                    </div>

                    {/* Password */}
                    <div className="">
                        <label htmlFor="password" className="">Password</label>
                        <div className="">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                                value={password}
                                onChange={handleForm}
                                name="password"
                            />
                            <button
                                type="button"
                                className=""
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        <p className="">{passwordError}</p>
                    </div>

                    {/* Error */}
                    {loginError && <p className="text-red-500">{loginError}</p>}

                    {/* Submit */}
                    <button
                        disabled={emailError || passwordError}
                        type="submit"
                        className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
