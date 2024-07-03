import React, { useState } from 'react';
import axios from 'axios';
import { IoArrowBack, IoLogoGoogle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from '../../utils/constant';
import Alert from "../../components/Alert"

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "PATIENT"
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const save = async () => {
    try {
      console.log(formData);
      if (formData.password !== formData.confirm_password) {
        console.log("invalid credentiaals");
        return;
      }


      const res = await axios.post(`${baseUrl}/auth.php`, formData);
      console.log(res);
      if (res.status === 200) {
        Alert("success", "User created successfully");
        setFormData(
          {
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "PATIENT"
          }
        );
        navigate("/");
      } else {
        console.log("error creating account", res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="w-screen md:h-screen flex items-center justify-center">
      <div className="hidden md:inline w-full h-full bg-[#8F1E63] opacity-10">
      </div>
      <div className="md:w-2/4 h-full flex items-center justify-center p-10">
        <form className="w-full">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="p-2 rounded-md text-[#8F1E63] bg-[#8F1E63] bg-opacity-10 "><IoArrowBack /></button>
            <p className="text-[#8F1E63] font-semibold">Go back</p>
          </div>
          <div className="w-full flex flex-col gap-10 py-10">
            <div>
              <h2 className="font-bold capitalize text-3xl">Sign up</h2>
              <p className="font-semibold capitalize mt-2">Already have an account? <Link to="/auth/login" className="text-[#8F1E63] font-bold">login</Link></p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <input type="text" name="firstname" id="firstname" onChange={handleChange} className="border-2 rounded-lg font-semibold capitalize border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] p-2" placeholder="First name" />
              <input type="text" name="lastname" id="lastname" onChange={handleChange} className="border-2 rounded-lg font-semibold capitalize border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] p-2" placeholder="last name" />
              <input type="text" name="phone" id="phone" onChange={handleChange} className="border-2 rounded-lg font-semibold capitalize border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] p-2" placeholder="phone number" />
              <input type="text" name="email" id="email" onChange={handleChange} className="border-2 rounded-lg font-semibold capitalize border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] p-2" placeholder="Email Address" />
              <input type="text" name="password" id="password" onChange={handleChange} className="border-2 rounded-lg font-semibold capitalize border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] p-2" placeholder="Password" />
              <input type="text" name="confirm_password" onChange={handleChange} id="confirm_password" className="border-2 rounded-lg font-semibold capitalize border-[#8F1E63] text-[#8F1E63] focus:outline-none placeholder:text-[#8F1E63] p-2" placeholder="Confirm Password" />
            </div>
            <button type="button" onClick={save} className=" flex justify-center items-center gap-1 font-bold capitalize text-white bg-[#8F1E63] w-full p-2 rounded-md">create account</button>


            <div className="flex justify-evenly items-center w-full">
              <hr className="w-[80%] border-1 border-black" />
              <p className="w-full capitalize text-center font-semibold">Create a new account</p>
              <hr className="w-[80%] border-1 border-black" />
            </div>

            <button className=" flex justify-center items-center gap-1 font-bold capitalize border-2 text-[#8F1E63] border-[#8F1E63] w-full p-2 rounded-md"> <IoLogoGoogle className="text-lg" /> Signup with Google</button>


          </div>
        </form>
      </div>
    </main>
  )
}

export default Signup