import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import Alert from '../../../components/Alert';
import { IoEye } from 'react-icons/io5';

const ViewRecord = ({ id, closeViewModal }) => {
    const [formData, setFormData] = useState({
        ref: '',
        type: '',
        staff: '',
        complain: '',
        hoc: '',
        course: '',
        cause: '',
        care: '',
        complication: '',
        pmh: '',
        sr: '',
        fsh: '',
        pd: '',
        remark: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseUrl}/record.php?id=${id}`);
                
                if (response.status === 200) {
                    const data = response.data;
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

    // const save = async (id) => {


    //     try {
    //         setLoading(true);
    //         setError(null);

    //         const response = await axios.put(`${baseUrl}/nurses.php?id=${id}`, formData);
    //         console.log(response);


    //         if (response.status === 200) {
    //             // User updated successfully
    //             if (response.data.status === "success") {
    //                 Alert("success", "Update was successful");
    //             }
    //             closeViewModal();
    //         } else {
    //             setError('Failed to update question');
    //             Alert("error", "Failed to update question");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setError('An error occurred while updating question');
    //         Alert("error", "An error occurred while updating question");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <IoEye className='text-green-500 text-sm' />
                    </div>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 uppercase" id="modal-title">View Record</h3>
                        
                        <form action="" className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                            <textarea onChange={handleChange} value={formData?.complain} name="complain" placeholder='Complain' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.hoc} name="hoc" placeholder='History Of Complain' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.cause} name="cause" placeholder='Cause' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.course} name="course" placeholder='Course' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.complication} name="complication" placeholder='Complication' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.care} name="care" placeholder='Care' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.pmh} name="pmh" placeholder='Past Medical History' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.sr} name="sr" placeholder='System Review' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.fsh} name="fsh" placeholder='Family and Social History' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>
                            <textarea onChange={handleChange} value={formData?.pd} name="pd" placeholder='Possible Diagnoses' className='w-full bg-slate-100 placeholder:text-slate-950 rounded-2xl p-3' rows={6} id=""></textarea>

                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {/* <button type="button" onClick={() => save(id)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button> */}
                <button type="button" onClick={closeViewModal} className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default ViewRecord;

