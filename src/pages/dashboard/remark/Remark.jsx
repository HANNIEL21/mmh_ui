import React, { useState } from 'react'

const Remark = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        ref: "",
        report_type: "",
        dot_type: "",
        remark: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <main >
            <form action="" className='flex flex-col gap-4' >
                <div className='grid grid-cols-3 gap-4'>
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
                        <input
                            type="text"
                            name="ref"
                            id="ref"
                            className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                            placeholder="Reference Number"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="marital_status" className="sr-only">Type Of Remark</label>
                        <select
                            name="report_type"
                            id="report_type"
                            className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                            onChange={handleChange}
                            value={formData.marital_status}
                        >
                            <option value="">TYPE OF REPORT</option>
                            {/* Replace with your actual marital status options */}
                            <option value="DOT">DOT</option>
                            <option value="DRESSING">DRESSING</option>
                        </select>
                    </div>
                    {
                        formData.report_type === "DOT" ? (
                            <>
                                <div className="w-full">
                                    <label htmlFor="marital_status" className="sr-only">Type Of Remark</label>
                                    <select
                                        name="dot_type"
                                        id="dot_type"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                        value={formData.dot_type}
                                    >
                                        <option value="">TYPE OF DOT</option>
                                        {/* Replace with your actual marital status options */}
                                        <option value="Oral Route">ORAL ROUTE</option>
                                        <option value="Parenteral Route">PARENTERAL ROUTE</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }
                </div>
                <textarea name="remark" placeholder='REMARK' className='p-4 rounded-lg' rows={10} id="remark"></textarea>
            </form>
        </main>
    )
}

export default Remark