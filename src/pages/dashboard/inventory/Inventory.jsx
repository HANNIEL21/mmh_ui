import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../utils/constant';
import axios from 'axios';

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
    }, [inventory]);


    return (
        <div className='p-5'>

            <div className='grid grid-cols-5 gap-5'>
                {inventory?.map((item) => (
                    <Link to={`/dashboard/inventory/${item.category}`}>
                        <div className=' bg-white p-3 rounded-md cursor-pointer font-extrabold text-slate-400 hover:text-appColor' key={item.id}>{item.category}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Inventory;
