import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, gender, marital_status, occupations, religion } from '../../utils/constant';
import { setData } from '../../redux/Features/User';
import Alert from '../../components/Alert';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.user);
    console.log(data);

    useEffect(() => {

    }, [])

    const [formData, setFormData] = useState({
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        gender: data.gender,
        occupation: data.occupation,
        religion: data.religion,
        marital_status: data.marital_status,
        email: data.email,
        phone: data.phone,
        address: data.address,
        fnnok: data.fnnok,
        lnnok: data.lnnok,
        pnnok: data.pnnok,
        anok: data.anok,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const updateProfile = async () => {
        console.log(formData);

        const res = await axios.put(`${baseUrl}/auth.php?id=${data.id}`, formData);
        Alert(res.data.status, res.data.message);
        if (res.data.status === "success") {
            dispatch(setData(res.data.data));
        }
        console.log(res);

    }

    return (
        <div className='w-full flex flex-col items-center gap-10'>
            <div className='flex items-center gap-10'>
                <div className='h-40 w-40 bg-white rounded-xl'></div>
                <div className='w-full grid grid-cols-5 gap-4'>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>First Name</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='firstname'
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Last Name</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='firstname'
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Email</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Phone</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Age</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='age'
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            className="font-extrabold capitalize w-full p-2 shadow rounded-md"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Gender</option>
                            {gender.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Occupation</label>
                        <select
                            name="occupation"
                            id="occupation"
                            className="font-extrabold capitalize w-full p-2 shadow rounded-md"
                            value={formData.occupation}
                            onChange={handleChange}
                        >
                            <option value="">Occupation</option>
                            {occupations.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Religion</label>
                        <select
                            name="religion"
                            id="religion"
                            className="font-extrabold capitalize w-full p-2 shadow rounded-md"
                            value={formData.religion}
                            onChange={handleChange}
                        >
                            <option value="">Religion</option>
                            {religion.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Religion</label>
                        <select
                            name="marital_status"
                            id="marital_status"
                            className="font-extrabold capitalize w-full p-2 shadow rounded-md"
                            value={formData.marital_status}
                            onChange={handleChange}
                        >
                            <option value="">MARITAL STATUS</option>
                            {marital_status.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Address</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>First Name Of Next of Kin</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='fnnok'
                            value={formData.fnnok}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Last Name Of Next of Kin</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='lnnok'
                            value={formData.lnnok}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Phone Number of Next of Kin</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='pnnok'
                            value={formData.pnnok}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className='font-bold capitalize text-sm text-slate-400'>Address of Next of Kin</label>
                        <input
                            className='font-extrabold capitalize w-full p-2 shadow rounded-md'
                            name='anok'
                            value={formData.anok}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <button onClick={updateProfile} className='bg-green-400 py-2 px-6 rounded-lg font-bold text-green-900'>Update</button>
        </div>
    );
};

export default EditProfile;
