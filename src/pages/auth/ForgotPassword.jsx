import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";


const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/resetpassword");
};

  return (
    <main className="w-screen md:h-screen flex items-center justify-center">
            <div className="hidden md:inlinew-full h-full bg-[#8F1E63] opacity-10">
            </div>
            <div className="md:w-2/4 h-full flex items-center justify-center p-10">
                <form className="w-full">
                    <div className="flex items-center gap-2">
                        <Link to="/auth/login" className="p-2 text-[#8F1E63] bg-[#8F1E63] bg-opacity-10 rounded-md "><IoArrowBack /></Link>
                        <p className="text-[#8F1E63] font-semibold">Go back</p>
                    </div>
                    <div className="w-full flex flex-col gap-10 py-10">
                        <div>
                            <h2 className="font-bold capitalize text-3xl ">forgot password</h2>
                            <p className="font-semibold mt-2 ">Enter email address to reset password. </p>
                        </div>

                        <input type="email" className="border-2 border-[#8F1E63] text-[#8F1E63] placeholder:text-[#8F1E63] p-2 rounded-lg" placeholder="Enter Email" />

                        <button type="button" onClick={handleClick} className="flex justify-center items-center gap-1 font-bold capitalize bg-[#8F1E63] text-white w-full p-2 rounded-md"> Reset Password </button>
                    </div>
                </form>
            </div>
        </main>
  )
}

export default ForgotPassword