import React from 'react';
import Sidebar from "../../components/Sidebar";
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header />
            <div className='flex h-full w-full'>
                <Sidebar className="h-full" />
                <main className="flex-1 h-full p-4 bg-slate-200">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
