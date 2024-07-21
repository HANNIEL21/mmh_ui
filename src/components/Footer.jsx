import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import { IoMail, IoLocationSharp, IoPhonePortrait } from "react-icons/io5";
import { FaPhone, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-[#8F1E63] bg-opacity-10 p-10">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <Link className="navbar-brand flex items-center gap-2" to="/">
                        <img src={logo} height={60} width={60} alt="hospital logo" />
                        <div className="capitalize text-[#8F1E63]">
                            <h3 className="font-extrabold text-2xl uppercase">mercy memorial hospital</h3>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <FaLocationDot className="text-3xl" />
                        <p className="capitalize">izor-olu/hospital road off school road, igwuruta-ali.</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FaPhone className="text-3xl" />
                        <div>
                            <p className="capitalize">08117256468</p>
                            <p className="capitalize">07026581924</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <IoMail className="text-3xl" />
                        <p className="">Mercymemorialhospital60@gmail.com</p>
                    </div>
                </div>
                <div className="">
                    <h2 className="uppercase font-bold text-2xl">quick links</h2>
                    <ul className="capitalize">
                        <li><a href="/">home</a></li>
                        <li><a href="#about">about</a></li>
                        <li><a href="#services">services</a></li>
                        <li><a href="/appointment">appointment</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="uppercase font-bold text-2xl">Services</h2>
                    <ul className="capitalize">
                        <li>general medicine</li>
                        <li>surgery</li>
                        <li>obstetrics and gynecology</li>
                        <li>pediatrics</li>
                        <li>laboratory services</li>
                        <li>Pharmacy</li>
                    </ul>
                </div>

            </section>
            <section>

            </section>
        </footer>
    );
}