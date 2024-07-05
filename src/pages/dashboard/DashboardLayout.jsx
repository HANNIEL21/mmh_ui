import React from 'react';
import Sidebar from "../../components/Sidebar";
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar className="h-full overflow-y-auto" />
                <main className="flex-1 p-4 bg-slate-200 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
