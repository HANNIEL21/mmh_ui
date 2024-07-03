import React, { useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { IoArrowBack, IoLogoGoogle } from "react-icons/io5";

// State Management
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setError, setLoadingTrue, setLoadingFalse, clearAuthState } from "../../redux/Features/Auth";
import Alert from '../../components/Alert';
import { baseUrl } from '../../utils/constant';
import { setData } from '../../redux/Features/User';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearAuthState());
    }, [])

    const { auth, message } = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        if (auth.email === "" || auth.password === "") {
            dispatch(setError("Please fill in all fields"));
            Alert("error", "Please fill in all fields");
            return;
        }
    
        try {
            const res = await axios.get(`${baseUrl}/auth.php`, {
                params: {
                    email: auth.email,
                    password: auth.password,
                }
            });
    
            console.log(res);
    
            if (res.data.status === "success") {
                Alert("success", res.data.message || "Login successful");
                dispatch(setData(res.data.data));
                navigate("/");
            } else {
                dispatch(setError(res.data.message || "Login failed"));
                Alert("error", res.data.message || "Login failed");
            }
        } catch (error) {
            dispatch(setError("An error occurred. Please try again."));
            Alert("error", "An error occurred. Please try again.");
        }
    };

    return (
        <main className="w-screen h-full md:h-screen flex items-center justify-center">
            <div className="hidden md:inline w-full h-full bg-[#8F1E63] opacity-10">
            </div>
            <div className="md:w-2/4 h-full flex items-center justify-center p-10">
                <form className="w-full">
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => navigate("/")} className="p-2 text-[#8F1E63] bg-[#8F1E63] bg-opacity-10 rounded-md ">
                            <IoArrowBack />
                        </button>
                        <p className="text-[#8F1E63] font-semibold">Go back</p>
                    </div>
                    <div className="w-full flex flex-col gap-10 py-10">
                        <div>
                            <h2 className="font-bold capitalize text-3xl ">Login</h2>
                            <p className="font-semibold capitalize mt-2 ">don&apos;t have an account? <Link to="/auth/signup" className="text-[#8F1E63] font-bold">sign up</Link></p>
                        </div>
                        <button className=" flex justify-center items-center gap-1 font-bold capitalize border-2 border-[#8F1E63] text-[#8F1E63]  w-full p-2 rounded-md"> <IoLogoGoogle className="text-lg" /> login with Google</button>

                        <div className="flex justify-evenly items-center w-full">
                            <hr className="w-[80%] border-1 border-black" />
                            <p className="w-full capitalize text-center font-semibold">Log into account</p>
                            <hr className="w-[80%] border-1 border-black" />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <input
                                type="text"
                                className="border-2 border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] rounded-lg font-semibold capitalize p-2"
                                placeholder="Email Address"
                                name="email"
                                onChange={(e) => dispatch(setEmail(e.target.value))}
                            />
                            <input
                                type="text"
                                className="border-2 border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] rounded-lg font-semibold capitalize p-2"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => dispatch(setPassword(e.target.value))}
                            />
                        </div>
                        <button type="button" onClick={handleSubmit} className="flex justify-center items-center gap-1 font-bold capitalize bg-[#8F1E63] text-white w-full p-2 rounded-md"> login </button>
                        <Link to="/auth/forgotpassword" className="mt-5 text-[#8F1E63] font-semibold">forgot password?</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login