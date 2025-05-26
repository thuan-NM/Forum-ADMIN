import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Common/Sidebar';
import Header from '../components/Common/Header';
import Breadcrumb from '../components/Common/Breadcrumb';

const MainLayout: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Breadcrumb />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 bg-content2">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;