import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import { baseUrl } from '../../../utils/constant';
import Alert from '../../../components/Alert';

const AddInventory = ({ inventory }) => {

    const [formData, setFormData] = useState({
        product: '',
        price: '',
        category: "",
        expiry: "",
        unit: "",
        quantity: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const save = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/inventory.php`, formData);
            console.log(res.data);

            if (res.status === 201) {
                Alert("success", "Product Added");
            } else {
                Alert("error", "Failed to add Product");
                console.error('Failed to add Product:', res.data.message);
            }
        } catch (error) {
            Alert("error", "Network Error");
            console.error('An error occurred while saving question', error.message);
        } finally {
            setFormData({
                product: '',
                price: '',
                category: "",
                expiry: "",
                unit: "",
                quantity: '',
            });
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex  flex-col items-start">

                <div className='flex items-center justify-center gap-4'>
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdOutlineAdd className='text-green-500 text-base' />
                    </div>
                    <h3 className="text-lg mt-2 leading-6 font-bold uppercase text-appColor" id="modal-title">Add Inventory</h3>
                </div>
                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                    <form className="w-full flex flex-col gap-4 mt-3">
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="w-full">
                                <label htmlFor="product" className='capitalize font-bold text-slate-400'>product</label>
                                <input
                                    type="text"
                                    name="product"
                                    id="product"
                                    value={formData.product}
                                    className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="Product"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className='capitalize font-bold text-slate-400'>price</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={formData.price}
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="Price"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="quantity" className='capitalize font-bold text-slate-400'>quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    value={formData.quantity}
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="Quantity"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="unit" className='capitalize font-bold text-slate-400'>unit</label>
                                <input
                                    type="text"
                                    name="unit"
                                    id="unit"
                                    value={formData.unit}
                                    className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="Unit"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="expiry" className='capitalize font-bold text-slate-400'>expiry date</label>
                                <input
                                    type="date"
                                    name="expiry"
                                    id="expiry"
                                    value={formData.expiry}
                                    className="border-2 focus :border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="expiry"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="category" className='capitalize font-bold text-slate-400'>category</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="">CATEGORY</option>
                                    {inventory.map((item, i) => (
                                        <option key={i}>{item.category}</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                    </form>

                </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
                <button type="button" onClick={save} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {
                        loading ? "Loading" : "Save"
                    }
                </button>
            </div>
        </div>
    );
}

export default AddInventory;