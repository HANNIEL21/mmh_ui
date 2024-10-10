import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import Alert from '../../../components/Alert';
import { baseUrl, gender, occupations, religion, role } from '../../../utils/constant';
import { useParams } from 'react-router-dom';

const EditPatient = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        email: '',
        ref: '',
        status: '',
        role: '',
        address: '',
        occupation: '',
        marital_status: '',
        phone: '',
        religion: '',
        fnnok: '',
        lnnok: '',
        pnnok: '',
        anok: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching data for patient ID:', id);

        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseUrl}/patients.php?id=${id}`);
                if (response.status === 200) {
                    const data = response.data.data;
                    setFormData(data);
                } else {
                    Alert("error", "Failed to fetch patient data");
                    setError('Failed to fetch patient data');
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
        try {
            setLoading(true);
            setError(null);

            const response = await axios.put(`${baseUrl}/patients.php?id=${id}`, formData);
            console.log(response);

            if (response.status === 200) {
                if (response.data.status === "success") {
                    Alert("success", "Patient update was successful");
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
                    <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 uppercase" id="modal-title">Edit Patient Profile</h3>
                </div>
                <form className="flex flex-col gap-4 mt-3">
                    <div className="grid grid-cols- md:grid-cols-4 gap-4 mt-3">
                        <div className="w-full">
                            <label htmlFor="firstname" className='capitalize font-bold text-slate-400'>firstname</label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="First Name"
                                value={formData?.firstname || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastname" className='capitalize font-bold text-slate-400'>lastname</label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Last Name"
                                value={formData?.lastname || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="phone" className='capitalize font-bold text-slate-400'>phone number</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Phone Number"
                                value={formData?.phone || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className='capitalize font-bold text-slate-400'>email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Email"
                                value={formData?.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="age" className='capitalize font-bold text-slate-400'>age</label>
                            <input
                                type="text"
                                name="age"
                                id="age"
                                className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Age"
                                value={formData?.age || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="ref" className='capitalize font-bold text-slate-400'>reference nummber</label>
                            <input
                                type="text"
                                name="ref"
                                id="ref"
                                className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Reference Number"
                                value={formData?.ref || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="marital_status" className='capitalize font-bold text-slate-400'>marital status</label>
                            <select
                                name="marital_status"
                                id="marital_status"
                                className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                onChange={handleChange}
                                value={formData?.marital_status || ""}
                            >
                                <option value="">MARITAL STATUS</option>
                                {/* Replace with your actual marital status options */}
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="gender" className='capitalize font-bold text-slate-400'>gender</label>
                            <select
                                name="gender"
                                id="gender"
                                className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                value={formData?.gender || ""}
                                onChange={handleChange}
                            >
                                <option value="">GENDER</option>
                                {gender.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="religion" className='capitalize font-bold text-slate-400'>religion</label>
                            <select
                                name="religion"
                                id="religion"
                                className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                onChange={handleChange}
                                value={formData?.religion || ""}
                            >
                                <option value="">SELECT RELIGION</option>
                                {religion.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="occupation" className='capitalize font-bold text-slate-400'>occupation</label>
                            <select
                                name="occupation"
                                id="occupation"
                                className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                onChange={handleChange}
                                value={formData?.occupation || ""}
                            >
                                <option value="">OCCUPATION</option>
                                {occupations.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="role" className='capitalize font-bold text-slate-400'>role</label>
                            <select
                                name="role"
                                id="role"
                                className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                onChange={handleChange}
                                value={formData?.role || ""}
                            >
                                <option value="">ROLE</option>
                                {role.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="status" className='capitalize font-bold text-slate-400'>status</label>
                            <select
                                name="status"
                                id="status"
                                className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                onChange={handleChange}
                                value={formData?.status || ""}
                            >
                                <option value="">STATUS</option>
                                <option value="IN_PATIENT">IN_PATIENT</option>
                                <option value="OUT_PATIENT">OUT_PATIENT</option>
                                
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="fnnok" className='capitalize font-bold text-slate-400'>firstname of N.O.K</label>
                            <input
                                type="text"
                                name="fnnok"
                                id="fnnok"
                                className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="First Name Of Next Of Kin"
                                value={formData?.fnnok || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lnnok" className='capitalize font-bold text-slate-400'>lastname of N.O.K</label>
                            <input
                                type="text"
                                name="lnnok"
                                id="lnnok"
                                className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Last Name Of Next Of Kin"
                                value={formData?.lnnok || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="pnnok" className='capitalize font-bold text-slate-400'>phone number of N.O.K</label>
                            <input
                                type="text"
                                name="pnnok"
                                id="pnnok"
                                className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                placeholder="Phone Number Of Next Of Kin"
                                value={formData?.pnnok || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <textarea
                            name="address"
                            id="address"
                            className="border-2 focus:border-appColor p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                            placeholder="ADDRESS"
                            value={formData?.address|| ""}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="w-full">
                        <textarea
                            name="anok"
                            id="anok"
                            className="border-2 focus:border-appColor p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                            placeholder="ADDRESS OF NEXT OF KIN"
                            value={formData?.anok || ""}
                            onChange={handleChange}
                        ></textarea>
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

export default EditPatient;
