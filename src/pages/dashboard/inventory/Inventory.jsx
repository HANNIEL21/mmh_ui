import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Inventory = () => {
    const [filter, setFilter] = useState("");
    const [inventory, setInventory] = useState([]);

    const category = [
        { id: 1, category: "Anti ulcer" },
        { id: 2, category: "Antihistamines" },
        { id: 3, category: "Anti Asthmatic drugs" },
        { id: 4, category: "Anxiolytics" },
        { id: 5, category: "Supplements & Vitamins" },
        { id: 6, category: "Ophthalmic preparation" },
        { id: 7, category: "Infusions" },
        { id: 8, category: "Antihypertensives" },
        { id: 9, category: "Decongestants" },
        { id: 10, category: "Anti diabetic" },
        { id: 11, category: "Diuretic" },
        { id: 12, category: "Antibiotics" },
        { id: 13, category: "Antifungal" },
        { id: 14, category: "Hyperlipidaemic drugs" },
        { id: 15, category: "Analgesic" },
        { id: 16, category: "Muscle Relaxants" },
        { id: 17, category: "Anti Emetic" },
        { id: 18, category: "Anti diarrhea" },
        { id: 19, category: "Anti Spasmodics" },
    ];

    return (
        <div className='p-5'>

            <div className='grid grid-cols-5 gap-5'>
                {category.map((item) => (
                    <Link to={`/dashboard/inventory/${item.category}`}>
                        <div className=' bg-white p-3 rounded-md cursor-pointer font-extrabold text-slate-400 hover:text-appColor' key={item.id}>{item.category}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Inventory;
