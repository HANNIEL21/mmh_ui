import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import Alert from '../../../components/Alert';
import { baseUrl } from '../../../utils/constant';
import { useParams } from 'react-router-dom';

const EditInventory = ({ id, closeEditModal }) => {
    const { category } = useParams();
    const [formData, setFormData] = useState({
        product: '',
        price: '',
        category: category,
        quantity: '',
    });
    const [loading, setLoading] = useState(false);
    const [cate, setCate] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching question for qId:', id);

        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${baseUrl}/drug_category.php`);
                if (res.data.status === "success") {
                    const data = res.data.data;
                    console.log(data);

                    setCate(data);
                    console.log(cate);

                } else {
                    Alert("error", "Failed to fetch question data");
                    setError('Failed to fetch question data');
                }
            } catch (error) {
                console.log(error);
            }
        }

        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseUrl}/inventory.php?id=${id}`);

                if (response.data.status === "success") {
                    const data = response.data.data;
                    console.log(data);
                    setFormData(data);
                } else {
                    Alert("error", "Failed to fetch question data");
                    setError('Failed to fetch question data');
                }
            } catch (error) {
                console.log(error);
                Alert("error", "An error occurred while fetching question data");
                setError('An error occurred while fetching question data');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
        fetchUserData();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const save = async (id) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.put(`${baseUrl}/inventory.php?id=${id}`, formData);
            console.log(response);

            if (response.status === 200) {
                // User updated successfully
                if (response.data.status === "success") {
                    Alert("success", "Question update was successful");
                }
                closeEditModal();
            } else {
                setError('Failed to update question');
                Alert("error", "Failed to update question");
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while updating question');
            Alert("error", "An error occurred while updating question");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdEdit className='text-green-500 text-sm' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 uppercase" id="modal-title">Edit Patient</h3>
                        <form className="flex flex-col gap-4 mt-3">
                            <div className="grid md:grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="product"
                                        id="product"
                                        className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="product"
                                        value={formData.product}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="category" className="sr-only">Category</label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                        value={formData.category}
                                    >
                                        <option value="">Select Category</option>
                                        {cate.map((category) => (
                                            <option key={category.id} value={category.category}>{category.category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    onClick={() => save(id)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    type="button"
                    onClick={closeEditModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditInventory;
