import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMenu, IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/Features/User";
import Alert from "./Alert";

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
        const links = data.role === "ADMIN" || data.role === "DOCTOR" || data.role === "NURSE"
            ? [
                { path: "/", label: "Home" },
                { path: "/profile", label: "Profile" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/appointment", label: "Appointment" },
                { path: "/dashboard/services", label: "Services" },
                { path: "/dashboard/contact", label: "Contact" },
            ]
            : [
                { path: "/", label: "Home" },
                { path: "/profile", label: "Profile" },
                { path: "/dashboard/about", label: "About" },
                { path: "/dashboard/services", label: "Services" },
                { path: "/dashboard/contact", label: "Contact" },
            ];

        return links.map(link => (
            <li className="mb-2" key={link.path}>
                <Link to={link.path}>{link.label}</Link>
            </li>
        ));
    };

    return (
        <>
            {isDashboard ? (
                <header className="w-full shadow-md flex gap-16 justify-between py-2 px-10 items-center">
                    <nav className="w-1/4 flex items-center justify-start">
                        <Link className="navbar-brand flex items-center gap-2" to="/">
                            <img src={logo} height={60} width={60} alt="hospital logo" />
                            <div className="capitalize text-[#8F1E63]">
                                <h3 className="font-extrabold text-2xl uppercase">bethesda</h3>
                                <p className="font-extrabold">Admin Dashboard</p>
                            </div>
                        </Link>
                    </nav>
                    <nav>
                        <div className="flex gap-2 items-center">
                            <div onClick={handleSidebarToggle} className="h-10 w-10 bg-appColor rounded-full flex items-center justify-center uppercase font-bold cursor-pointer">
                                {data.firstname?.charAt(0) + data.lastname?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-extrabold capitalize">{data.firstname + " " + data.lastname}</p>
                                <p className="font-bold text-sm">{data.role}</p>
                            </div>
                        </div>
                        {sidebarOpen && (
                            <div id="sidebar-overlay" className="w-full h-[93vh] absolute left-0 z-50" onClick={handleCloseSidebar}>
                                <div className="w-[300px] h-full bg-white absolute shadow-md right-0 p-4">
                                    <ul>
                                        {renderSidebarLinks()}
                                        <button onClick={handleLogout} className="text-red-900 font-bold bg-red-400 px-4 py-2 rounded-md">Logout</button>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>
            ) : (
                <header className="px-5 py-1 flex justify-between items-center sticky top-0 z-50 bg-white">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand flex items-center gap-2" to="/">
                            <img src={logo} height={60} width={60} alt="hospital logo" />
                            <div className="capitalize text-[#8F1E63]">
                                <h3 className="font-extrabold text-2xl uppercase">bethesda</h3>
                                <p className="font-extrabold">mercy memorial hospital</p>
                            </div>
                        </Link>
                    </nav>
                    {data?.role ? (
                        <nav>
                            <div onClick={handleSidebarToggle} className="h-10 w-10 bg-appColor rounded-full flex items-center justify-center uppercase font-bold cursor-pointer">
                                {data.firstname?.charAt(0) + data.lastname?.charAt(0)}
                            </div>
                            {sidebarOpen && (
                                <div id="sidebar-overlay" className="w-full h-[93vh] absolute left-0" onClick={handleCloseSidebar}>
                                    <div className="w-[300px] h-full bg-white absolute shadow-md right-0 p-4">
                                        <ul>
                                            {renderSidebarLinks()}
                                            <button onClick={handleLogout} className="text-red-900 font-bold bg-red-400 px-4 py-2 rounded-md">Logout</button>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </nav>
                    ) : (
                        <nav className="hidden md:flex gap-2 items-center justify-end">
                            <button onClick={() => navigate("/appointment")} className="border-2 border-[#8F1E63] rounded-md bg-[#8F1E63] text-white p-2 uppercase font-semibold text-sm">book appointment</button>
                            <button type="button" onClick={() => navigate("/auth/login")} className="border-2 border-[#8F1E63] rounded-md text-[#8F1E63] p-2 uppercase font-semibold text-sm">login</button>
                        </nav>
                    )}
                    <nav className="md:hidden">
                        <button onClick={handleOpenMenu}>
                            <IoMenu className="text-3xl text-appColor" />
                        </button>
                        {menuOpen && (
                            <div className="h-screen w-screen absolute top-0 left-0 bg-white p-5">
                                <div className="flex items-center justify-end">
                                    <button onClick={handleOpenMenu}>
                                        <IoClose className="text-3xl text-appColor" />
                                    </button>
                                </div>
                                <div className="h-full w-full flex flex-col justify-center items-center gap-5">
                                    <Link className="capitalize font-bold text-appColor" to="/appointment">Book Appointment</Link>
                                    <Link className="capitalize font-bold text-appColor" to="/auth/login">Login</Link>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>
            )}
        </>
    );
}
