import React from 'react';
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';

const InventoryDetails = () => {

    const { category } = useParams();

    return (
        <div>
            <header className='flex items-center gap-10'>
                <Link to="/dashboard/inventory">
                    <button className='bg-white p-1 rounded-md'>
                        <IoArrowBack size={20} className='text-appColor' />
                    </button>
                </Link>
                <h1 className='text-xl font-extrabold text-center capitalize '>{category}</h1>
            </header>
        </div>
    )
}

export default InventoryDetails