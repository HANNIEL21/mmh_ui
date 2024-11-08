import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import Alert from '../../../components/Alert';
import { baseUrl } from '../../../utils/constant';
import { useParams } from 'react-router-dom';

const EditMedical = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        user_id: id,
        temperature: '',
        pulse: '',
        respiration: '',
        bp: '',
        weight: '',
        height: '',
        spo2: '',
        bmi: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching data for patient ID:', id);

        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseUrl}/vitals.php?id=${id}`);
                console.log(response.data);

                if (response.status === 200) {
                    const data = response.data.data;
                    setFormData(data);
                } else {
                    Alert(response.data.status, response.data.message);
                    setError(response.data.message);
                }
            } catch (error) {
                console.log(error);
                Alert("error", "An error occurred while fetching patient data");
                setError('An error occurred while fetching patient data');
            } finally {
                setLoading(false);
            }
        };

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
        console.log(formData);
        try {
            setLoading(true);
            setError(null);

            const response = await axios.put(`${baseUrl}/vitals.php?id=${id}`, formData);

            if (response.status === 201) {
                if (response.data.status === "success") {
                    Alert("success", "Patient update was successful");
                } else {
                    setError('Failed to update patient');
                    Alert("error", "Failed to update patient");
                }
            } else {
                setError('Failed to update patient');
                Alert("error", "Failed to update patient");
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while updating patient');
            Alert("error", "An error occurred while updating patient");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-white px-4 ">
                <div className='flex gap-5'>
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdEdit className='text-green-500 text-sm' />
                    </div>
                    <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 uppercase" id="modal-title">Edit Patient Vitals</h3>
                </div>
                <form className="flex flex-col gap-4 mt-3">
                    <div className="grid grid-cols- md:grid-cols-4 gap-4 mt-3">
                        <div className="w-full">
                            <input
                                type="text"
                                name="bp"
                                id="bp"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Blood Pressure"
                                value={formData?.bp}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="pulse"
                                id="pulse"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Pulse"
                                value={formData?.pulse}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="temperature"
                                id="temperature"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Temperature"
                                value={formData?.temperature}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="respiration"
                                id="respiration"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Respiration"
                                value={formData?.respiration}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="weight"
                                id="weight"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Weight"
                                value={formData?.weight}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="height"
                                id="height"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Height"
                                value={formData?.height}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="spo2"
                                id="spo2"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="SPO2"
                                value={formData?.spo2}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="bmi"
                                id="bmi"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="BMI"
                                value={formData?.bmi}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => save(id)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default EditMedical;
