import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../utils/constant';
import axios from 'axios';
import AddInventory from './AddInventory';
import { MdAdd } from 'react-icons/md';

const Inventory = () => {
    const [filter, setFilter] = useState("");
    const [inventory, setInventory] = useState([]);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);

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


    const openModal = (modalName, id) => {
        switch (modalName) {
          case 'add':
            setIsOpenAddModal(true);
            break;
          default:
            console.error('Invalid modal name');
        }
      };
    
      const closeModal = (modalName) => {
        switch (modalName) {
          case 'add':
            setIsOpenAddModal(false);
            break;
          default:
            console.error('Invalid modal name');
        }
      };


    return (
        <div className='h-full w-full flex'>

            <div className='w-full h-full px-4'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
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
                <>
                    <button
                        onClick={() => openModal("add")}
                        className="bg-appColor absolute bottom-12 right-5  lg:hidden flex items-center gap-2 text-white font-bold text-sm rounded-md p-1 focus:outline-none"
                    >
                        <MdAdd className='text-white text-3xl' />
                    </button>

                    {isOpenAddModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full p-8">
                                    <AddInventory inventory={inventory} closeModal={() => closeModal("add")}  />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            </div>
            <div className='w-1/3 h-full border-l-2 border-slate-400 px-2 hidden  lg:flex items-start justify-center'>
                <AddInventory inventory={inventory} />
            </div>
        </div>
    );
}

export default Inventory;
