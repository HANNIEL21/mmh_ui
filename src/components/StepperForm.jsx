import { useState } from 'react';
import { FaCheck } from "react-icons/fa6";


export default function StepperForm() {

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        service: '',
        doctor: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        note: '',
        date: '',
        time: '',
    });

    const steps = [
        { id: "0", name: "service" },
        { id: "1", name: "date" },
        { id: "2", name: "details" },
        { id: "3", name: "done" },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = () => {
        console.log(formData);
    }



    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-10 text-appColor capitalize">book an appointment</h2>
            <div className='w-full md:w-8/12 lg:w-6/12'>
                <div className="flex items-center justify-evenly mb-5 w-full">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-col">
                            <div className="relative flex flex-col items-center">
                                <div
                                    className={`rounded-full h-12 w-12 flex items-center justify-center border-2 ${currentStep >= index ? 'bg-appColor text-white border-appColor' : 'bg-white text-gray-500 border-gray-300'}`}
                                >
                                    {currentStep > index ? <FaCheck /> : index + 1}
                                </div>
                            </div>
                            <h3 className={`text-center capitalize mt-2 ${currentStep === index ? 'text-appColor font-bold' : 'text-gray-500'}`}>{step.name}</h3>
                        </div>
                    ))}
                </div>
                <form className="bg-white p-6 rounded-lg shadow-md">
                    {currentStep === 0 && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Please Select Service</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div className="w-full">
                                    <label htmlFor="service" className="sr-only">Service</label>
                                    <select
                                        name="service"
                                        id="service"
                                        className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2  border-gray-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">Service</option>

                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="doctor" className="sr-only">Doctor</label>
                                    <select
                                        name="doctor"
                                        id="doctor"
                                        className="shadow-sm focus:border-blue-500 block w-full sm:text-sm p-2  border-gray-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">Doctor</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 1 && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Select Date & Time</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div className="w-full">
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Enter Your Email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="time"
                                        name="time"
                                        id="time"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Enter Your Phone Number"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Enter Details</h3>
                            <div className='flex flex-col gap-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                            placeholder="Enter Your firstname"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                            placeholder="Enter Your lastname"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div className="w-full">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                            placeholder="Enter Your Email"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                            placeholder="Enter Your Phone Number"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <textarea
                                        type="text"
                                        name="note"
                                        id="note"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Notes......"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Appointment Confirmed</h3>
                            <p>Your appointment is set! Thank you for booking with us.</p>
                        </div>
                    )}
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`px-4 py-2 bg-gray-300 text-appColor font-bold rounded ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                        >
                            Previous
                        </button>
                        {currentStep === steps.length - 1 ? (<></>) : (<button
                            type="button"
                            onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                            className={`px-4 py-2 bg-appColor text-white font-bold rounded `}
                        >
                            {currentStep === steps.length - 2 ? "Submit" : "Next"}
                        </button>)
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}