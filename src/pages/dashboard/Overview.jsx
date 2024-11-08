import React from 'react';
import DataTable from 'react-data-table-component';
import { FaUserNurse, FaUserDoctor, FaUserInjured, FaBedPulse , FaCalendarDays, FaClipboard, FaFileMedical } from "react-icons/fa6";

const Overview = () => {
  return (
    <main className='w-full h-full px-5 py-5'>
      <div className='w-full h-full grid grid-cols-1 md:grid-cols-12 gap-5 '>
        <section className='w-full h-full flex flex-col gap-5 md:col-span-9'>
          <div className='w-full md:h-4/6 grid grid-rows-1 md:grid-rows-3 gap-5 '>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 h-2/4'>
              <div className='bg-white p-5 w-full rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaUserInjured className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total patients</p>
                  <p className='font-extrabold capitalize text-3xl text-appColor'>0</p>
                </div>
              </div>
              <div className='bg-white p-5 w-full rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaBedPulse  className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total bed spaces</p>
                  <p className='font-extrabold capitalize text-2xl text-appColor'>52/100</p>
                </div>
              </div>
              <div className='bg-white p-5 w-full rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaUserNurse className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total Staffs</p>
                  <p className='font-extrabold capitalize text-3xl text-appColor'>0</p>
                </div>
              </div>
              <div className='bg-white p-5 w-full rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaUserDoctor className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total Doctors</p>
                  <p className='font-extrabold capitalize text-3xl text-appColor'>0</p>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 h-full row-span-1 md:row-span-2'>
              <div className='bg-white p-5 w-full md:col-span-2 rounded-lg'></div>
              <div className='bg-white p-5 w-full rounded-lg'></div>
            </div>
          </div>
          <div className='bg-white w-full h-3/6 p-10 rounded-lg'></div>
        </section>
        <section className=' bg-white w-full h-full p-10 rounded-lg md:col-span-3'>

        </section>
      </div>
    </main>
  )
}

export default Overview 