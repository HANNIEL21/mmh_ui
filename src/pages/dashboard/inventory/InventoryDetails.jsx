    import React, { useEffect, useState } from 'react';
    import { IoArrowBack } from "react-icons/io5";
    import { Link, useParams } from 'react-router-dom';
    import Table from '../../../components/Table';
    import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
    import EditInventory from './EditInventory';
    import DeleteInventory from './DeleteInventory';
    import AddInventory from './AddInventory';
    import axios from 'axios';
    import { baseUrl } from '../../../utils/constant';

    const InventoryDetails = () => {

        const { category } = useParams();

        const [isOpenAddModal, setIsOpenAddModal] = useState(false);
        const [isOpenEditModal, setIsOpenEditModal] = useState(false);
        const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
        const [selectedId, setSelectedId] = useState(null);
        const [product, setProduct] = useState([]);
        const [cate, setCate] = useState([]);

        useEffect(() => {
            const fetchCate = async () => {
                try {
                    const res = await axios.get(`${baseUrl}/drug_category.php?id=${category}`);
                    console.log(res);
                    
                    setCate(res.data.data);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };
            fetchCate();

            const fetchData = async () => {
                try {
                    const res = await axios.get(`${baseUrl}/inventory.php`);
                    console.log(res.data?.data);
                    setProduct(res.data?.data);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };
            fetchData();
        }, []);

        const item = product?.filter(item => 
            item.category.trim().toLowerCase() === cate.category.trim().toLowerCase()
        );
        console.log(item);
        
        

        const columns = [
            { name: 'PRODUCT', selector: row => row.product, sortable: true },
            { name: 'PRICE', selector: row => row.price, sortable: true },
            { name: 'QUANTITY', selector: row => row.quantity, sortable: true },
            { name: 'UNIT', selector: row => row.unit, sortable: true },
            { name: 'EXPIRY', selector: row => row.expiry, sortable: true },
            {
                name: 'ACTION',
                cell: row => (
                    <div className='flex gap-4'>
                        <button
                            onClick={() => openModal("edit", row.id)}
                            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
                        >
                            <MdEdit className='text-xl text-green-700' />
                        </button>
                        {isOpenEditModal && selectedId === row.id && (
                            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                        <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
                                    </div>
                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                        <EditInventory closeEditModal={() => closeModal("edit")} id={selectedId} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => openModal("delete", row.id)}
                            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
                        >
                            <MdDelete className='text-xl text-red-700' />
                        </button>
                        {isOpenDeleteModal && selectedId === row.id && (
                            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                        <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
                                    </div>
                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                        <DeleteInventory closeDeleteModal={() => closeModal("delete")} qId={selectedId} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ),
            },
        ];

        const openModal = (modalName, id = null) => {
            setSelectedId(id);
            switch (modalName) {
                case 'add':
                    setIsOpenAddModal(true);
                    break;
                case 'edit':
                    setIsOpenEditModal(true);
                    break;
                case 'delete':
                    setIsOpenDeleteModal(true);
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
                case 'edit':
                    setIsOpenEditModal(false);
                    break;
                case 'delete':
                    setIsOpenDeleteModal(false);
                    break;
                default:
                    console.error('Invalid modal name');
            }
        };


        return (
            <div>
                <header className='flex items-center gap-10 mb-3'>
                    <Link to="/dashboard/inventory">
                        <button className='bg-white p-1 rounded-md'>
                            <IoArrowBack size={20} className='text-appColor' />
                        </button>
                    </Link>
                    <h1 className='text-xl font-extrabold text-center capitalize '>{cate?.category}</h1>
                </header>
                <main>
                    <Table
                        label={columns}
                        filter={"product"}
                        data={item}
                    />
                </main>
            </div>
        )
    }

    export default InventoryDetails