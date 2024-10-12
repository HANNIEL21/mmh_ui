import React, { useState, useEffect } from 'react'
import ItemCard from '../../../components/ItemCard'
import { baseUrl } from '../../../utils/constant';
import axios from 'axios';

const Pharmacy = () => {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/inventory.php`);
                console.log(res.data);
                setItems(res.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-full h-full flex'>
            <div className='w-full h-full'>
                <div className='w-full grid grid-cols-4 gap-4 '>
                    {
                        items?.map((item, i) => (
                            <ItemCard key={i} data={item} />
                        ))
                    }
                </div>
            </div>
            <div className='w-1/3 h-full border-l-2 border-slate-400 px-2'>
                    <h2 className='font-bold text-xl text-appColor capitalize'>summary</h2>
                    <div className='h-max'>

                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='font-bold capitalize text-xl'>total <span>{total}</span></p>
                        <button className='bg-appColor p-2 px-10 rounded-lg text-white font-bold uppercase '>save</button>
                    </div>
            </div>
        </div>
    )
}

export default Pharmacy