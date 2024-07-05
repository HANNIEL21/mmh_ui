import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import { baseUrl } from '../../../../utils/constant';
import Alert from '../../../../components/Alert';

const AddDrugCategory = ({ closeAddModal }) => {
    const [formData, setFormData] = useState({
        category: '',
    });


    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const save = async () => {
        try {
            console.log(formData);
            // Save the question
            const res = await axios.post(`${baseUrl}/drug_category.php`, formData);
            console.log(res);
            if (res.data.status === "success") {
                Alert(res.data.status, res.data.message);
                closeAddModal();
            } else {
                Alert(res.data.status, res.data.message);
                closeAddModal();
            }
        } catch (error) {
            Alert('error', 'An error occurred while saving question')
            console.error('An error occurred while saving question', error.message);
        }
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdOutlineAdd className='text-green-500 text-base' />
                    </div>
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-bold uppercase text-slate-800" id="modal-title">Add Category</h3>
                        <form className="flex flex-col gap-4 mt-3 w-full">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="Category"
                                    onChange={handleChange}
                                />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={save} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </button>
                <button type="button" onClick={closeAddModal} className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddDrugCategory;
