import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../utils/constant';
import { useParams } from 'react-router-dom';

const RecordsProfile = () => {
  const { patient } = useParams();
  const [data, setData] = useState({});
  const [vitals, setVitals] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/patients.php?id=${patient}`);
        const vitals = await axios.get(`${baseUrl}/vitals.php?id=${patient}`);
        console.log(res.data);
        setData(res.data.data);
        setVitals(vitals.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patient]);

  return (
    <main className='w-full p-3 flex flex-col gap-4'>
      <section className='w-full'>
        <div className='w-full flex gap-3'>
          <span className='w-1 bg-slate-500'></span>
          <div className='w-full flex justify-between gap-5'>
            <p className='uppercase font-extrabold text-slate-500'>Patient Information</p>
            <p className='uppercase font-extrabold text-slate-500'>updated: <span>{data?.updated_at}</span></p>
          </div>
        </div>
        <div className='px-4 py-2 grid grid-cols-5 gap-3'>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Age</p>
            <p className='font-bold capitalize'>{data?.age} years old</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Gender</p>
            <p className='font-bold'>{data?.gender}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Email Address</p>
            <p className='font-bold'>{data?.email}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Mobile Number</p>
            <p className='font-bold'>{data?.phone}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Address</p>
            <p className='font-bold'>{data?.address}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Religion</p>
            <p className='font-bold'>{data?.religion}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Marital Status</p>
            <p className='font-bold'>{data?.marital_status}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Next of Kin</p>
            <p className='font-bold'>{data?.fnnok + " " + data?.lnnok}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Mobile Number of Next of Kin</p>
            <p className='font-bold'>{data?.pnnok}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Address of Next of Kin</p>
            <p className='font-bold'>{data?.anok}</p>
          </div>
        </div>
      </section>
      <section className='w-full'>
        <div className='w-full flex gap-3'>
          <span className='w-1 bg-slate-500'></span>
          <div className='w-full flex justify-between gap-5'>
            <p className='uppercase font-extrabold text-slate-500'>Medical Information</p>
            <p className='uppercase font-extrabold text-slate-500'>updated: <span>{vitals?.updated_at}</span></p>
          </div>
        </div>
        <div className='px-4 py-2 grid grid-cols-5 gap-3'>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Temperature</p>
            <p className='font-bold'>{vitals?.temperature}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Pulse</p>
            <p className='font-bold'>{vitals?.pulse}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Respiration</p>
            <p className='font-bold'>{vitals?.respiration}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Blood Pressure</p>
            <p className='font-bold'>{vitals?.bp}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Weight</p>
            <p className='font-bold'>{vitals?.weight}</p>
          </div>
          <div>
            <p className='text-slate-500 text-sm font-bold capitalize'>Height</p>
            <p className='font-bold'>{vitals?.height}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecordsProfile;
