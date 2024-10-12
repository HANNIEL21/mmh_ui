import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../utils/constant';
import axios from 'axios';
import AddInventory from './AddInventory';

const Inventory = () => {
    const [filter, setFilter] = useState("");
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/drug_category.php`);
                setInventory(res.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='h-full w-full flex'>

            <div className='w-full h-full px-4'>
                <div className='grid grid-cols-4 gap-5'>
                    {inventory?.map((item) => (
                        <Link to={`/dashboard/inventory/${item.id}`} key={item.id}>
                            <div
                                className='bg-white p-3 rounded-md cursor-pointer font-extrabold text-slate-400 hover:text-appColor truncate transition duration-300 ease-in-out hover:scale-110 hover:shadow-md'
                            >
                                {item.category}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='w-1/3 h-full border-l-2 border-slate-400 px-2 flex items-start justify-center'>
                <AddInventory inventory={inventory} />
            </div>
        </div>
    );
}

export default Inventory;
