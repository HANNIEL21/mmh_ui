import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPills, FaBaby, FaSyringe, FaPhone, FaPerson, FaHeartPulse, FaCalendarCheck, FaThumbsUp } from "react-icons/fa6";
import { ImLab } from "react-icons/im";
import { IoPhonePortraitOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { AiOutlineWoman } from "react-icons/ai";
import { RxHobbyKnife } from "react-icons/rx";
import { MdSick, MdPermContactCalendar } from "react-icons/md";
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'animate.css';
import doctor from "../assets/doctor.png";
import background from "../assets/background.jfif";

const LandingPage = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if any of the data fields is empty
    const isAnyFieldEmpty = Object.values(data ?? {}).filter(value => value === '').length > 0;


    if (isAnyFieldEmpty) {
      navigate('/profile');
    }
  }, [data, navigate]);

  return (
    <div>
      <Header />
      <main className="h-full w-full overflow-hidden">
        <section className=' md:p-20 py-10 h-[75vh] md:h-[90vh] flex flex-col md:flex-row justify-center items-center'>
          <div className='w-3/4 md:px-20'>
            <div className='text-center'>
              <p className='font-extrabold text-sm capitalize '>your health is our priority</p>
              <h1 className='font-extrabold text-4xl md:text-6xl text-appColor capitalize'>We take care of your health <span className='hidden md:inline-flex'><FaHeartPulse className='text-7xl md:text-8xl inline animate__animated animate__pulse animate__infinite' /></span> </h1>
              <span className='md:hidden text-appColor'><FaHeartPulse className='text-7xl md:text-8xl inline animate__animated animate__pulse animate__infinite' /></span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mt-10'>
              <div className='flex gap-4 items-center'>
                <div className='bg-appColor bg-opacity-40 text-appColor rounded-md p-2'><FaThumbsUp /></div>
                <h3 className='font-bold capitalize'>get health consultations</h3>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='bg-appColor bg-opacity-40 text-appColor rounded-md p-2'><MdPermContactCalendar /></div>
                <h3 className='font-bold capitalize'>find the best doctors</h3>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='bg-appColor bg-opacity-40 text-appColor rounded-md p-2'><FaCalendarCheck /></div>
                <h3 className='font-bold capitalize'>Book appointments</h3>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='bg-appColor bg-opacity-40 text-appColor rounded-md p-2'><IoChatbubbleEllipsesOutline /></div>
                <h3 className='font-bold capitalize'>ask your questions</h3>
              </div>
            </div>
          </div>
          <div className='h-full w-full hidden md:inline '>
            <img src={doctor} className='h-full' alt="african doctor by freepik" />
          </div>
        </section>
        {/* Services */}
        <section id='services' className="bg-appColor bg-opacity-10 w-full flex flex-col lg:flex-row gap-10 rounded-3xl px-10 py-8  md:py-16">
          <div className="text-center flex flex-col items-center justify-center w-full lg:w-3/4">
            <p className="font-bold text-appColor capitalize">our services</p>
            <h2 className="font-extrabold text-3xl capitalize">comprehensive medical solution</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center place-items-center gap-5">
            <div className="p-4 bg-white rounded-lg shadow-sm w-3/4 flex flex-col items-center text-center">
              <FaPills className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">general medicine</h2>
              <p className="text-sm">the branch of medicine that deals with the diagnosis and (nonsurgical) treatment of diseases of the internal organs.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm w-3/4 flex flex-col items-center text-center">
              <RxHobbyKnife className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">surgery</h2>
              <p className="text-sm">a branch of medicine concerned with diseases and conditions requiring or amenable to operative or manual procedures.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm w-3/4 flex flex-col items-center text-center">
              <AiOutlineWoman className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">Gynecology</h2>
              <p className="text-sm">a branch of medicine that deals with the diseases and routine physical care of the reproductive system of women.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm w-3/4 flex flex-col items-center text-center">
              <FaBaby className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">Obstetrics</h2>
              <p className="text-sm">a branch of medical science that deals with pregnancy, childbirth, and the postpartum period.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm w-3/4 flex flex-col items-center text-center">
              <MdSick className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">Pediatrics</h2>
              <p className="text-sm">a branch of medicine dealing with the development, care, and diseases of infants, children, and adolescents.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm w-3/4 flex flex-col items-center text-center">
              <ImLab className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">laboratory services</h2>
              <p className="text-sm">the branch of medicine that deals with the diagnosis and (nonsurgical) treatment of diseases of the internal organs.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm w-3/4 flex flex-col items-center text-center">
              <FaSyringe className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">Pharmacy</h2>
              <p className="text-sm">the art, practice, or profession of preparing, preserving, compounding, and dispensing medical drugs.</p>
            </div>
          </div>
        </section>

        {/* About */}
        <section id='about' className=" w-full flex flex-col md:flex-row gap-14 md:p-20 p-10">
          <div className=" w-full md:w-4/12">
            <p className="font-bold text-appColor capitalize">about us</p>
            <h2 className="font-extrabold text-3xl capitalize my-5">welcome to Mercy Memorial Hospital (MMH)</h2>

            <p>
              located in the South-South region of Nigeria, MMH is a state-of-the-art medical facility dedicated to excellence, compassion, and innovation. Our experienced team provides personalized, comprehensive care across a range of specialties.
              Equipped with advanced technology, MMH is committed to clinical excellence and community engagement through outreach programs and health education initiatives. Whether for routine care, specialized treatment, or emergency services, trust MMH for compassionate, patient-centered care.
              We are dedicated to serving you and your loved ones with the highest standards of care and professionalism.
            </p>
          </div>
          <div className='md:h-[60vh] w-full rounded-lg overflow-hidden'>
              <img src={background} className='h-full w-full' alt="" />
          </div>
        </section>

        {/* Appointment */}
        <section id='appointment' className="w-full flex flex-col md:flex-row items-center gap-10 p-10 md:p-20 bg-appColor rounded-3xl bg-opacity-10">
          <div className=" md:w-5/12">
            <p className="font-bold text-appColor capitalize">Book an Appointment</p>
            <h2 className="font-extrabold text-3xl capitalize my-5">How to Book an Appointment</h2>

            <p>
              At Mercy Memorial Hospital (MMH), your health and convenience are our top priorities. Booking an appointment with our team of skilled healthcare professionals is simple and straightforward.
            </p>

            <button onClick={() => navigate("/appointment")} className="mt-5 bg-appColor rounded-md  text-white p-2 px-5 uppercase font-bold">book appointment</button>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <div className="p-4 bg-white rounded-lg shadow-sm md:w-1/4 flex flex-col items-center text-center">
              <IoPhonePortraitOutline className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">online</h2>
              <p className="text-sm">Visit our website and use our easy-to-navigate online booking system to select your preferred date and time.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm md:w-1/4 flex flex-col items-center text-center">
              <FaPhone className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">phone</h2>
              <p className="text-sm">Call our appointment desk at [Phone Number] to schedule a visit at your convenience.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm md:w-1/4 flex flex-col items-center text-center">
              <FaPerson className="text-4xl" />
              <h2 className="font-bold capitalize text-appColor my-2">in person</h2>
              <p className="text-sm">Stop by our reception desk, and our friendly staff will assist you in booking your appointment.</p>
            </div>
          </div>
        </section>
        <section></section>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage;