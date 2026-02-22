import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import en from "../Local/en";
import ar from "../Local/ar";
import { useSelector } from "react-redux";

function Login() {
    const lang = useSelector((state) => state.lang.language);
    const content = lang === "en" ? en : ar;

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
                ? setEmailError(content.email_required)
                : emailRegex.test(e.target.value) === false
                    ? setEmailError(content.email_format)
                    : setEmailError("");
        } else {
            setPassword(e.target.value);
            e.target.value.length === 0
                ? setPasswordError(content.password_required)
                : e.target.value.length < 8
                    ? setPasswordError(content.password_length)
                    : setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        if (
            !emailError &&
            !passwordError &&
            email &&
            password
        )

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
                        navigate("/courses");
                    }

                } else {
                    setLoginError(content.user_not_found);
                }
            } catch (error) {
                console.error("Error logging in:", error);
                setLoginError(content.invalid_credentials);
            }

        setEmail("");
        setPassword("");
    };



    return (
        <>
            <div className="min-h-70 bg-gray-50 flex items-center justify-center p-4">
                <div className="flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden bg-white shadow-2xl rounded-3xl">
                    {/* Left Side */}
                    <div className="lg:w-1/2 p-12 hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#FFC000] to-[#FF8A00]">
                        <h1 className="mt-8 text-6xl font-bold text-white text-center">{content.learnix}</h1>
                        <h2 className="mt-8 text-4xl font-bold text-white text-center">
                            {content.welcome_back}
                        </h2>
                        <p className="mt-4 text-white text-center text-lg">
                            {content.login_continue}
                        </p>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                                {content.login}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {content.no_account} <Link to="/register" className="text-[#FF8A00] hover:underline font-semibold">{content.signup}</Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{content.email}</label>
                                <input
                                    id="email"
                                    type="text"
                                    className="px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    value={email}
                                    onChange={handleForm}
                                    name="email"
                                />
                                <p className="text-red-500">{emailError}</p>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">{content.password}</label>
                                <div className="flex w-full">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="px-3 py-2 mt-1 flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        value={password}
                                        onChange={handleForm}
                                        name="password"
                                    />
                                    <button
                                        type="button"
                                        className="px-3 py-2 mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500-5"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? content.hide : content.show}
                                    </button>
                                </div>
                                <p className="text-red-500">{passwordError}</p>
                            </div>

                            {/* Error */}
                            {loginError && <p className="text-red-500">{loginError}</p>}

                            {/* Submit */}
                            <button
                                disabled={emailError || passwordError}
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#FFC000] hover:bg-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                            >
                                {content.login}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
