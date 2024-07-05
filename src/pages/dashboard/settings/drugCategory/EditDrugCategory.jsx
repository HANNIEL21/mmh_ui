import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import Alert from '../../../../components/Alert';
import { baseUrl } from '../../../../utils/constant';

const EditDrugCategory = ({ id, closeEditModal }) => {
    const [formData, setFormData] = useState({
        category: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseUrl}/drug_category.php?id=${id}`);
                console.log(response);
                if (response.status === 200) {
                    const data = response.data.data;
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

        fetchUserData();
       
    }, [id]);

    console.log(formData);

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

            const response = await axios.put(`${baseUrl}/drug_category.php?id=${id}`, formData);
            console.log(response);


            if (response.status === 200) {
                // User updated successfully
                if (response.data.status === "success") {
                    Alert("success", "Category was updated");
                }
                closeEditModal();
            } else {
                setError('Failed to update question');
                Alert("error", "Failed to update category");
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while updating question');
            Alert("error", "An error occurred while updating category");
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
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-bold uppercase text-slate-800" id="modal-title">Edit Category</h3>
                        <form className="flex flex-col gap-4 mt-3 w-full">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="Category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => save(id)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeEditModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditDrugCategory;

