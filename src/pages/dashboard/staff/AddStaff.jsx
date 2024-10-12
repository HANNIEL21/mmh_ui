import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setStaffs } from '../../../redux/Features/Dashboard';
import { baseUrl, gender, marital_status, occupations, religion } from '../../../utils/constant';
import Alert from '../../../components/Alert';

const AddStaff = ({ closeAddModal }) => {
    const dispatch = useDispatch();
    const staffs = useSelector((state) => state.dashboard.staffs);

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
            console.log(formData);
            const res = await axios.post(`${baseUrl}/staff.php`, formData);

            if (res.status === 201) {
                const newData = res.data?.data;

                const updatedStaffs = [...staffs, newData];
                dispatch(setStaffs(updatedStaffs));

                Alert("success", "Account Created");
            } else {
                Alert("error", "Failed to create account");
            }
        } catch (error) {
            console.error('An error occurred while saving the staff:', error.message);
            Alert("error", "Network Error.");
        } finally {
            setLoading(false);
            closeAddModal();
        }
    };

    return (
        <div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MdOutlineAdd className='text-green-500 text-base' />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg mt-2 leading-6 font-bold uppercase text-slate-800" id="modal-title">Add Staff</h3>
                        <form className="flex flex-col gap-4 mt-3">
                            <div className="grid grid-cols- md:grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="First Name"
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
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="marital_status" className="sr-only">gender</label>
                                    <select
                                        name="marital_status"
                                        id="marital_status"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">MARITAL STATUS</option>
                                        {marital_status.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="gender" className="sr-only">gender</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">GENDER</option>
                                        {gender.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="gender" className="sr-only">gender</label>
                                    <select
                                        name="religion"
                                        id="religion"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">RELIGION</option>
                                        {religion.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="gender" className="sr-only">gender</label>
                                    <select
                                        name="occupation"
                                        id="occupation"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">OCCUPATION</option>
                                        {occupations.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="fnnok"
                                        id="fnnok"
                                        className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="First Name Of Next Of Kin"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="lnnok"
                                        id="lnnok"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Last Name Of Next Of Kin"
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
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <textarea
                                    name="anok"
                                    id="anok"
                                    className="border-2 focus:border-appColor p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                    placeholder="ADDRESS OF NEXT OF KIN"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={save} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {loading ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={closeAddModal} className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddStaff;

