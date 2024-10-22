import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import Alert from '../../../../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../../utils/constant';

const Consultation = () => {

    const [formData, setFormData] = useState({
        ref: '',
        type: 'CONSULTATION',
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
            const res = await axios.post(`${baseUrl}/patients.php`, formData);

            if (res.status === 201) {
                Alert("success", "Patient Created");
            } else {
                Alert("error", "Failed to create Created");
                console.log(res);
            }
        } catch (error) {
            Alert("error", "Network Error");
            console.error('An error occurred while saving question', error.message);
        } finally {
            setLoading(false);
            // closeAddModal();
        }
    };

    return (
        <div className='p-5'>
            <form action="" className='grid grid-cols-2 gap-10'>
                <textarea name="complain" placeholder='Complain' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="hoc" placeholder='History Of Complain' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="cause" placeholder='Cause' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="course" placeholder='Course' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="complication" placeholder='Complication' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="care" placeholder='Care' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="pmh" placeholder='Past Medical History' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="sr" placeholder='System Review' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="fsh" placeholder='Family and Social History' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="pd" placeholder='Possible Diagnoses' className='rounded-2xl p-3' rows={6} id=""></textarea>

            </form>
            <div className='w-full my-4 flex items-center'>
                <div className="w-full">
                    <input name="ref" placeholder='REFERENCE NUMBER' className='rounded-2xl p-3 w-3/6' id="" />
                </div>
                <button className='p-2 px-10 bg-appColor rounded-md text-white font-bold'>{loading ? "SAVING...." : "SAVE"}</button>
            </div>
        </div>
    )
}

export default Consultation;