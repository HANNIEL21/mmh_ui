import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import Alert from '../../../components/Alert';
import { baseUrl, gender, occupations, religion, role } from '../../../utils/constant';

const EditStaff = ({ id, closeEditModal }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        email: '',
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
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseUrl}/staff.php?id=${id}`);
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

            const response = await axios.put(`${baseUrl}/staff.php?id=${id}`, formData);
            console.log(response);


            if (response.status === 200) {
                Alert("success", "Update Successful");

            } else {
                Alert("error", "Update Failed");
            }
        } catch (error) {
            console.log(error);
            Alert("error", "Network Error");
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
                        <h3 className="text-lg mt-2 leading-6 font-medium text-gray-900 uppercase" id="modal-title">Edit Staff</h3>
                        <form className="flex flex-col gap-4 mt-3">
                            <div className="grid grid-cols- md:grid-cols-2 gap-4 mt-3">
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
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Last Name"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="age"
                                        id="age"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Age"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="marital_status" className="sr-only">MARITAL STATUS</label>
                                    <select
                                        name="marital_status"
                                        id="marital_status"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                        value={formData.marital_status}
                                    >
                                        <option value="">MARITAL STATUS</option>
                                        {/* {categories.map((item, i) => (<option key={i} value={item}>{item}</option>))} */}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="gender" className="sr-only">gender</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">GENDER</option>
                                        {gender.map((item, i) => (
                                            <option key={i} value={item} selected={formData.gender === item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="religion" className="sr-only">RELIGION</label>
                                    <select
                                        name="religion"
                                        id="religion"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                        value={formData.religion}
                                    >
                                        <option value="">SELECT RELIGION</option>
                                        {religion.map((item, i) => (
                                            <option key={i} value={item} selected={formData.gender === item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="occupation" className="sr-only">occupation</label>
                                    <select
                                        name="occupation"
                                        id="occupation"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                        value={formData.occupation}
                                    >
                                        <option value="">OCCUPATION</option>
                                        {occupations.map((item, i) => (
                                            <option key={i} value={item} selected={formData.gender === item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="role" className="sr-only">role</label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                        value={formData.role}
                                    >
                                        <option value="">ROLE</option>
                                        {role.map((item, i) => (
                                            <option key={i} value={item} selected={formData.role === item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="fnnok"
                                        id="fnnok"
                                        className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="First Name Of Next Of Kin"
                                        value={formData.fnnok}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Last Name Of Next Of Kin"
                                        value={formData.lnnok}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="pnnok"
                                        id="pnnok"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Phone Number Of Next Of Kin"
                                        value={formData.pnnok}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="note"
                                    id="note"
                                    className="border-2 focus:border-appColor p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="ADDRESS"
                                    value={formData.address}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="note"
                                    id="note"
                                    className="border-2 focus:border-appColor p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="ADDRESS OF NEXT OF KIN"
                                    value={formData.anok}
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

export default EditStaff;

