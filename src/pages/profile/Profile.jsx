import React from 'react';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const Profile = () => {
    const { data } = useSelector((state) => state.user);

    const subLinks = [
        { name: "profile", to: "/profile", icon: "" },
        { name: "vital signs", to: "", icon: "" },
        { name: "medical record", to: "", icon: "" },
        { name: "medication", to: "", icon: "" },
        { name: "lab test results", to: "", icon: "" },
        { name: "payment history", to: "", icon: "" },
        { name: "appointment history", to: "", icon: "" },
    ]

    return (
        <div className='h-[91vh]'>
            <Header />
            <main className='bg-slate-100 h-full p-10 flex flex-col gap-10'>
                <div className='w-full h-full'>
                    <div className='border-b border-slate-400 flex items-center justify-around p-2'>
                        {
                            subLinks.map((link, i) => (
                                <Link key={i} to={link.to} className='capitalize text-sm text-slate-400 font-extrabold'>
                                    {link.name}
                                </Link>
                            ))
                        }
                    </div>
                    <div className='h-full p-10'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile