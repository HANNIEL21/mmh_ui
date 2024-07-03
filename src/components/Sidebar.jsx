'use client';
import { Link, useLocation } from "react-router-dom";

import { BsGrid1X2Fill } from "react-icons/bs";
import { FaUserNurse, FaUserDoctor, FaUserInjured, FaWallet, FaCalendarDays, FaClipboard, FaFileMedical } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';

export default function Sidebar() {
    const location = useLocation();
    const { data } = useSelector((state) => state.user);

    const links = [
        { name: "dashboard", href: "/dashboard", icon: <BsGrid1X2Fill /> },
        { name: "appointments", href: "/dashboard/appointments", icon: <FaClipboard /> },
        { name: "calendar", href: "/dashboard/calendar", icon: <FaCalendarDays /> },
        { name: "Patients", href: "/dashboard/patients", icon: <FaUserInjured /> },
        { name: "doctors", href: "/dashboard/doctors", icon: <FaUserDoctor /> },
        { name: "nurses", href: "/dashboard/nurses", icon: <FaUserNurse /> },
        { name: "records", href: "/dashboard/records", icon: <FaFileMedical /> },
        { name: "payments", href: "/dashboard/payments", icon: <FaWallet /> },
        { name: "inventory", href: "/dashboard/inventory", icon: <MdInventory /> },
        { name: "settings", href: "/dashboard/settings", icon: <FaCog /> },
    ];

    const docLinks = [
        { name: "dashboard", href: "/dashboard", icon: <BsGrid1X2Fill /> },
        { name: "appointments", href: "/dashboard/appointments", icon: <FaClipboard /> },
        { name: "calendar", href: "/dashboard/calendar", icon: <FaCalendarDays /> },
        { name: "Patients", href: "/dashboard/patients", icon: <FaUserInjured /> },
        { name: "doctors", href: "/dashboard/doctors", icon: <FaUserDoctor /> },
        { name: "nurses", href: "/dashboard/nurses", icon: <FaUserNurse /> },
        { name: "records", href: "/dashboard/records", icon: <FaFileMedical /> },
    ];

    const nurseLinks = [
        { name: "dashboard", href: "/dashboard", icon: <BsGrid1X2Fill /> },
        { name: "appointments", href: "/dashboard/appointments", icon: <FaClipboard /> },
        { name: "calendar", href: "/dashboard/calendar", icon: <FaCalendarDays /> },
        { name: "Patients", href: "/dashboard/patients", icon: <FaUserInjured /> },
        { name: "doctors", href: "/dashboard/doctors", icon: <FaUserDoctor /> },
        { name: "nurses", href: "/dashboard/nurses", icon: <FaUserNurse /> },
        { name: "records", href: "/dashboard/records", icon: <FaFileMedical /> },
        { name: "payments", href: "/dashboard/payments", icon: <FaWallet /> },
        { name: "settings", href: "/dashboard/settings", icon: <FaCog /> },
    ];

    return (
        <aside className="h-full w-[250px] shadow-md flex items-center" >
            {data?.role === "ADMIN" ? (
                <ul className=" flex flex-col gap-2 px-8">
                    {links.map((link, index) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <li key={index} className={`flex items-center py-2 px-4 transition-all duration-300 ease-in-out ${isActive ? 'border-r-4 border-appColor text-appColor capitalize font-bold text-lg' : 'hover:bg-[#8F1E63] rounded-md hover:text-white text-slate-400 capitalize font-semibold'}`}>
                                <Link to={link.href} className="flex items-center w-full">
                                    {link.icon}
                                    <span className="ml-3">{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : data?.role === "DOCTOR" ? (
                <ul className=" flex flex-col gap-2 px-8">
                    {docLinks.map((link, index) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <li key={index} className={`flex items-center py-2 px-4 transition-all duration-300 ease-in-out ${isActive ? 'border-r-4 border-appColor text-appColor capitalize font-bold text-lg' : 'hover:bg-[#8F1E63] rounded-md hover:text-white text-slate-400 capitalize font-semibold'}`}>
                                <Link to={link.href} className="flex items-center w-full">
                                    {link.icon}
                                    <span className="ml-3">{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : data?.role === "NURSE" ? (
                <ul className=" flex flex-col gap-2 px-8">
                    {nurseLinks.map((link, index) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <li key={index} className={`flex items-center py-2 px-4 transition-all duration-300 ease-in-out ${isActive ? 'border-r-4 border-appColor text-appColor capitalize font-bold text-lg' : 'hover:bg-[#8F1E63] rounded-md hover:text-white text-slate-400 capitalize font-semibold'}`}>
                                <Link to={link.href} className="flex items-center w-full">
                                    {link.icon}
                                    <span className="ml-3">{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (<></>)
            }
        </aside>
    );
}
