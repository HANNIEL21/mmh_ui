import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Settings = () => {
    const subLinks = [
        { name: 'Drug Categories', link: '/settings/drugCatrgories' },
    ]
    return (
        <div className='bg-white h-full p-5 flex flex-col gap-4 rounded-xl'>
            <div className='border-b border-slate-400 flex items-center justify-around p-1'>
                {
                    subLinks.map((link, i) => (
                        <Link key={i} to={link.to} className='capitalize text-sm text-slate-400 font-extrabold'>
                            {link.name}
                        </Link>
                    ))
                }
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Settings