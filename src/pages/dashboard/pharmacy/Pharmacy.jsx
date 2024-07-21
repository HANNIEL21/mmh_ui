import React, { useState, useEffect } from 'react'
import ItemCard from '../../../components/ItemCard'
import { baseUrl } from '../../../utils/constant';
import axios from 'axios';

const Pharmacy = () => {
    const [items, setItems] = useState([]);
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
        <div div className='w-full h-full'>
            <div className='grid grid-cols-6 gap-4 '>
                {
                    items?.map((item, i) => (
                        <ItemCard key={i} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Pharmacy