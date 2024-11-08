import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';
import Alert from '../../../../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../../utils/constant';

const Consultation = () => {
    const {data} = useSelector((state)=>state.user);
    
    const [formData, setFormData] = useState({
        ref: '',
        type: 'CONSULTATION',
        staff: `${data?.firstname} ${data?.lastname}`,
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
            const res = await axios.post(`${baseUrl}/record.php`, formData);
            console.log(res);

            if (res.status === 201) {
                Alert("success", "Record Created");
            } else {
                Alert("error", "Failed to create record");
                console.log(res);
            }
        } catch (error) {
            Alert("error", "Network Error");
            console.error('An error occurred while saving record', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5'>
            <form action="" className='grid md:grid-cols-2 gap-10'>
                <textarea onChange={handleChange} name="complain" placeholder='Complain' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="hoc" placeholder='History Of Complain' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="cause" placeholder='Cause' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="course" placeholder='Course' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="complication" placeholder='Complication' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="care" placeholder='Care' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="pmh" placeholder='Past Medical History' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="sr" placeholder='System Review' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="fsh" placeholder='Family and Social History' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea onChange={handleChange} name="pd" placeholder='Possible Diagnoses' className='rounded-2xl p-3' rows={6} id=""></textarea>

            </form>
            <div className='w-full gap-3 my-4 flex items-center'>
                <div className="w-full">
                    <input name="ref" onChange={handleChange} placeholder='REFERENCE NUMBER' className='rounded-2xl p-3 w-full md:w-3/6' id="" />
                </div>
                <button onClick={save} className='p-2 px-10 bg-appColor rounded-md text-white font-bold'>{loading ? "SAVING...." : "SAVE"}</button>
            </div>
        </div>
    )
}

export default Consultation;