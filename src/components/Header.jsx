import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMenu, IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/Features/User";
import Alert from "./Alert";
import { IoHome, IoLogIn, IoCloudDownloadSharp } from "react-icons/io5";
import Sidebar from "./Sidebar";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { data } = useSelector((state) => state.user);
    console.log(data);
    const isDashboard = location.pathname.startsWith("/dashboard");
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleOpenMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCloseSidebar = (e) => {
        if (e.target.id === "sidebar-overlay") {
            setSidebarOpen(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        Alert('success', "User Logged Out")
        navigate("/");
    };

    const renderSidebarLinks = () => {
        const links = data.role === "PATIENT"
            ? [
                { path: "/", label: "Home" },
                { path: "/profile", label: "Profile" },
                { path: "/dashboard/about", label: "About" },
                { path: "/dashboard/services", label: "Services" },
            ] : [
                { path: "/", label: "Home" },
                { path: "/profile", label: "Profile" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/appointment", label: "Appointment" },
                { path: "/dashboard/services", label: "Services" },
            ];

        return links.map(link => (
            <li className="mb-2 font-bold hover:font-extrabold hover:text-appColor" key={link.path}>
                <Link to={link.path}>{link.label}</Link>
            </li>
        ));
    };

    return (
        <>
            {isDashboard ? (
                <header className="w-full shadow-md flex gap-16 justify-between py-2 px-8 items-center">
                    <nav className="w-1/4 flex items-center justify-start">
                        <button className="md:hidden" onClick={handleSidebarToggle}>
                            <IoMenu className="text-3xl text-appColor" />
                        </button>
                        <Link className="navbar-brand flex items-center gap-2" to="/">
                            <img src={logo} height={60} width={60} alt="hospital logo" />
                            <div className="hidden md:flex flex-col capitalize text-[#8F1E63]">
                                <h3 className="font-extrabold text-2xl uppercase">bethesda</h3>
                                <p className="font-extrabold">Admin Dashboard</p>
                            </div>
                            <div className="md:hidden capitalize text-[#8F1E63]">
                                <h3 className="font-extrabold text-2xl uppercase">mmh</h3>
                            </div>
                        </Link>
                    </nav>
                    <nav>
                        <div className="flex gap-2 items-center">
                            <div className="h-10 w-10 bg-appColor rounded-full flex items-center justify-center uppercase font-bold cursor-pointer">
                                {data.firstname?.charAt(0) + data.lastname?.charAt(0)}
                            </div>
                        </div>
                        {sidebarOpen && (
                            <div id="sidebar-overlay" className="w-[250px] h-[88vh] absolute bg-white top-[74px] left-0 z-50" onClick={handleCloseSidebar}>
                                <Sidebar style={"flex"} />
                            </div>
                        )}
                    </nav>
                </header>
            ) : (
                <header className="px-5 py-1 flex justify-between items-center sticky top-0 z-50 bg-white">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand flex items-center gap-2" to="/">
                            <img src={logo} height={60} width={60} alt="hospital logo" />
                            <div className="hidden md:inline-flex flex-col capitalize text-[#8F1E63]">
                                <h3 className="font-extrabold text-2xl uppercase">bethesda</h3>
                                <p className="font-extrabold">mercy memorial hospital</p>
                            </div>
                            <div className="md:hidden capitalize text-[#8F1E63]">
                                <h3 className="font-extrabold text-2xl uppercase">mmh</h3>
                            </div>
                        </Link>
                    </nav>

                    <nav className="">
                        {data?.role ? (
                            <div className="hidden lg:flex items-center gap-4" onClick={handleOpenMenu}>
                                <div className="h-10 w-10 bg-appColor  text-white rounded-full flex items-center justify-center uppercase font-bold cursor-pointer">
                                    {data.firstname?.charAt(0) + data.lastname?.charAt(0)}
                                </div>
                                <p className="font-bold text-sm">{data?.role}</p>
                            </div>
                        ) : (
                            <nav className="hidden lg:flex gap-2 items-center justify-end">
                                <button onClick={() => navigate("/appointment")} className="border-2 border-[#8F1E63] rounded-md bg-[#8F1E63] text-white p-2 uppercase font-semibold text-sm">book appointment</button>
                                <button type="button" onClick={() => navigate("/auth/login")} className="border-2 border-[#8F1E63] rounded-md text-[#8F1E63] p-2 uppercase font-semibold text-sm">login</button>
                            </nav>
                        )}

                        <button className="lg:hidden" onClick={handleOpenMenu}>
                            <IoMenu className="text-3xl text-appColor" />
                        </button>
                        {menuOpen && (
                            <div className="h-[91vh] w-[100%] md:w-[300px] absolute top-16 right-0 flex flex-col items-center justify-center bg-white">
                                {data?.role ? (
                                    <div className="h-full w-full flex flex-col items-center justify-between py-6">
                                        <ul className="h-full w-full flex flex-col items-center justify-center">
                                            {renderSidebarLinks()}
                                        </ul>
                                        <div className="w-full flex items-center justify-between px-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 bg-appColor  text-white rounded-full flex items-center justify-center uppercase font-bold cursor-pointer">
                                                    {data.firstname?.charAt(0) + data.lastname?.charAt(0)}
                                                </div>
                                                <p className="font-bold text-sm">{data?.role}</p>
                                            </div>
                                            <button onClick={handleLogout} className="text-red-900 font-bold bg-red-400 px-4 py-2 rounded-md">Logout</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={handleOpenMenu} className="absolute top-5 right-5">
                                            <IoClose className="text-3xl text-appColor" />
                                        </button>
                                        <div className="flex flex-col gap-4">
                                            <Link onClick={handleOpenMenu} className="capitalize font-bold bg-appColor text-white rounded-lg p-2 flex gap-2 items-center justify-center" to="/appointment">Book Appointment</Link>
                                            <Link onClick={handleOpenMenu} className="capitalize font-bold bg-appColor text-white rounded-lg p-2 flex gap-2 items-center justify-center" to="/"><IoHome /> Home</Link>
                                            <Link onClick={handleOpenMenu} className="capitalize font-bold bg-appColor text-white rounded-lg p-2 flex gap-2 items-center justify-center" to="/appointment"><IoCloudDownloadSharp /> Download</Link>
                                            <Link onClick={handleOpenMenu} className="capitalize font-bold bg-appColor text-white rounded-lg p-2 flex gap-2 items-center justify-center" to="/auth/login"><IoLogIn />Login</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav >
                </header >
            )
            }
        </>
    );
}
