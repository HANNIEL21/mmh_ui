import React from 'react';
import DataTable from 'react-data-table-component';
import { FaUserNurse, FaUserDoctor, FaUserInjured, FaBedPulse , FaCalendarDays, FaClipboard, FaFileMedical } from "react-icons/fa6";

const Overview = () => {
  return (
    <main className='w-full h-full px-5 py-5'>
      <div className='w-full h-full flex gap-5 '>
        <section className='w-3/4 h-full flex flex-col gap-5'>
          <div className='w-full h-4/6 flex flex-col gap-5 '>
            <div className='flex gap-5 h-2/4'>
              <div className='bg-white p-5 w-2/6 rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaUserInjured className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total patients</p>
                  <p className='font-extrabold capitalize text-3xl text-appColor'>0</p>
                </div>
              </div>
              <div className='bg-white p-5 w-2/6 rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaBedPulse  className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total bed spaces</p>
                  <p className='font-extrabold capitalize text-2xl text-appColor'>52/100</p>
                </div>
              </div>
              <div className='bg-white p-5 w-2/6 rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaUserNurse className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total Staffs</p>
                  <p className='font-extrabold capitalize text-3xl text-appColor'>0</p>
                </div>
              </div>
              <div className='bg-white p-5 w-2/6 rounded-lg flex items-center justify-evenly'>
                <div>
                  <FaUserDoctor className='text-slate-500 text-4xl' />
                </div>
                <div>
                  <p className='font-bold capitalize text-sm text-slate-500'>total Doctors</p>
                  <p className='font-extrabold capitalize text-3xl text-appColor'>0</p>
                </div>
              </div>
            </div>

            <div className='flex gap-5 h-full'>
              <div className='bg-white p-5 w-3/4 rounded-lg'></div>
              <div className='bg-white p-5 w-2/4 rounded-lg'></div>
            </div>
          </div>
          <div className='w-full h-3/6  bg-white p-10 rounded-lg'></div>
        </section>
        <section className='w-1/4 h-full bg-white p-10 rounded-lg'>

        </section>
      </div>
    </main>
  )
}

export default Overview