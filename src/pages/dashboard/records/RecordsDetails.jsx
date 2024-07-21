import React, { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';

const RecordsDetails = () => {
  const { patient } = useParams();

  const [active, setActive] = useState(`/dashboard/records/${patient}`);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/patients.php?id=${patient}`);
        console.log(res.data.data);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [patient]);

  const subLinks = [
    { name: "personal information", to: `/dashboard/records/${patient}`, icon: "" },
    { name: "medical record", to: `/dashboard/records/${patient}/medical`, icon: "" },
    { name: "lab test results", to: `/dashboard/records/${patient}/lab`, icon: "" },
    { name: "payment history", to: `/dashboard/records/${patient}/payment`, icon: "" },
    { name: "appointment history", to: `/dashboard/records/${patient}/appointment`, icon: "" },
  ];

  return (
    <div className='w-full '>
      <header className='w-full flex items-center gap-10 mb-6'>
        <Link to="/dashboard/records">
          <button className='bg-white p-1 rounded-md'>
            <IoArrowBack size={20} className='text-appColor' />
          </button>
        </Link>
        <div className='flex items-center gap-6'>
          <div className='h-24 w-24 rounded-3xl bg-slate-500'></div>
          <div className='flex flex-col gap-2'>
            <h2 className='font-extrabold text-3xl capitalize text-slate-500'>{data?.firstname + " " + data?.lastname}</h2>
            <p className='font-bold uppercase text-slate-500'>joined: <span>{data?.created_at}</span></p>
          </div>
        </div>
      </header>
      <div className='w-full border-b border-slate-400 flex items-center justify-around'>
        {
          subLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              onClick={() => setActive(link.to)}
              className={`capitalize text-sm p-1 ${active === link.to ? 'text-slate-500 border-slate-500 border-b-2 font-extrabold' : 'text-slate-400 font-extrabold'}`}
            >
              {link.name}
            </Link>
          ))
        }
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RecordsDetails;
