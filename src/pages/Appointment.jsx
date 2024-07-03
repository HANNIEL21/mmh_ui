import React from 'react';
import Header from "../components/Header";
import StepperForm from "../components/StepperForm";
import stethoscope from "../assets/stethoscope.png";
import { FaHandHoldingMedical, FaCalendarDays, FaClipboard, FaClipboardCheck } from "react-icons/fa6";

const Appointment = () => {
    return (
        <div className='w-full'>
            <Header />
            <section className="px-20 h-[88vh] w-full flex flex-col md:flex-row items-center justify-around">
                <div className=" md:w-2/4 flex flex-col gap-5">
                    <h1 className="capitalize w-full text-appColor text-4xl md:text-5xl font-bold">book your doctor appointment online</h1>
                    <p>a healthier tomorrow starts today, schedule your wellness appointment today!</p>
                    <div className="flex gap-5 items-center">
                        <a href='#form' className="bg-white p-2 rounded-md text-appColor font-bold uppercase">book an appointment</a>
                        <button className="border-2 border-appColor p-2 rounded-md text-appColor font-bold uppercase">call now</button>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img src={stethoscope} alt="stethoscope image" />
                </div>
            </section>
            <section className="bg-appColor p-10 md:p-20  flex flex-col items-center justify-center gap-5">
                <h2 className="text-3xl md:text-6xl  font-extrabold text-white text-center capitalize">how it works!</h2>
                <p className="font-semibold text-center text-white  capitalize w-3/3 md:w-1/3">book and experience personalised healthcare effortlessly with user-friendly Doctor Appointment Portal</p>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-4 justify-items-center gap-3 md:px-20">
                    <div className="bg-white w-4/4 md:w-3/4 p-4 flex flex-col items-center text-center rounded-xl">
                        <div className="text-2xl"><FaHandHoldingMedical /></div>
                        <h3 className="font-bold text-2xl text-appColor my-3 capitalize">Service</h3>
                        <p className="font-semibold text-sm">
                            Select from our comprehensive range of medical services tailored to meet your diverse healthcare needs.
                        </p>
                    </div>
                    <div className="bg-white w-4/4 md:w-3/4 p-4 flex flex-col items-center text-center rounded-xl">
                        <div className="text-2xl"><FaCalendarDays /></div>
                        <h3 className="font-bold text-2xl text-appColor my-3 capitalize">Date & Time</h3>
                        <p className="font-semibold text-sm">
                            Select your preferred date and time for your appointment. Our flexible scheduling options ensure that you can choose a time that best fits your busy life.
                        </p>
                    </div>
                    <div className="bg-white w-4/4 md:w-3/4 p-4 flex flex-col items-center text-center rounded-xl">
                        <div className="text-2xl"><FaClipboard /></div>
                        <h3 className="font-bold text-2xl text-appColor my-3 capitalize">Details</h3>
                        <p className="font-semibold text-sm">
                            Enter your personal information to help us prepare for your visit. Accurate details ensure that we provide the best possible care tailored to your needs.
                        </p>
                    </div>
                    <div className="bg-white w-4/4 md:w-3/4 p-4 flex flex-col items-center text-center rounded-xl">
                        <div className="text-2xl"><FaClipboardCheck /></div>
                        <h3 className="font-bold text-2xl text-appColor my-3">Done</h3>
                        <p className="font-semibold text-sm">
                            Your appointment is set! We look forward to providing you with top-notch medical care. If you have any further questions or need to make changes, please contact us.
                        </p>
                    </div>

                </div>
            </section>
            <section id='form' className="p-10 md:p-20 h-full md:h-[90vh] w-full">
                <StepperForm />
            </section>
        </div>
    )
}

export default Appointment