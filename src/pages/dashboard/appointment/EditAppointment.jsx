import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import Alert from '../../../components/Alert';
import { baseUrl } from '../../../utils/constant';

const EditAppointment = ({ id, closeEditModal }) => {
    const [formData, setFormData] = useState({
        type: '',
        ref: '',
        date: '',
        time: '',
        firstname: '',
        lastname: '',
        note: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching appointment for Id:', id);
        const fetchAppointmentData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`${baseUrl}/appointment.php?id=${id}`);

                if (res.status === 200) {
                    const appointmentData = res.data?.data;
                    setFormData(appointmentData);
                } else {
                    Alert("error", "Failed to fetch appointment data");
                    setError('Failed to fetch appointment data');
                }
            } catch (error) {
                console.error(error);
                Alert("error", "An error occurred while fetching appointment data");
                setError('An error occurred while fetching appointment data');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointmentData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const save = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.put(`${baseUrl}/appointment.php?id=${id}`, formData);
            console.log(res);
            
            if (res.status === 200) {
                Alert("success", "Appointment update was successful");
            } else {
                setError('Failed to update appointment');
                Alert("error", "Failed to update appointment");
            }
        } catch (error) {
            setError('An error occurred while updating appointment');
            Alert("error", "An error occurred while updating appointment");
        } finally {
            setLoading(false);
            closeEditModal();
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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 uppercase" id="modal-title">Edit Appointment</h3>
                        <form className="flex flex-col gap-4 mt-3">
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="First Name"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Last Name"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="type" className="sr-only">Service</label>
                                    <select
                                        name="type"
                                        id="type"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        value={formData.type}
                                        onChange={handleChange}
                                    >
                                        <option value="">TYPE</option>
                                        <option value="IN-PERSON">IN-PERSON</option>
                                        <option value="VIRTUAL">VIRTUAL</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="ref"
                                        id="ref"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        value={formData.ref}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="time"
                                        name="time"
                                        id="time"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        value={formData.time}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="note"
                                    id="note"
                                    className="border-2 focus:border-appColor p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="Note..."
                                    value={formData.note}
                                    onChange={handleChange}
                                ></textarea>
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

export default EditAppointment;
