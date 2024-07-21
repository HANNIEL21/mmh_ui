import React from 'react';
import { Link, Outlet, useParams } from "react-router-dom";

const EditRoot = () => {
  const { id } = useParams();

  return (
    <main className='h-full flex flex-col gap-2'>
      <div className='flex gap-4 p-2'>
        <Link className='text-sm capitalize font-bold' to="/dashboard/patients">Back</Link>
        <Link className='text-sm capitalize font-bold' to={`/dashboard/patients/edit/${id}`}>Edit Profile</Link>
        <Link className='text-sm capitalize font-bold' to={`/dashboard/patients/edit/${id}/vitals`}>Edit vitals</Link>
      </div>
      <div className='h-[80vh] bg-white rounded-lg p-4'>
        <Outlet />
      </div>
    </main>
  );
}

export default EditRoot;
