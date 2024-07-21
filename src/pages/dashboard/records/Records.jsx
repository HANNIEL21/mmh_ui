import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../../utils/constant';
import { Link } from 'react-router-dom';

const Records = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${baseUrl}/patients.php`);
        setPatients(res.data.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);


  console.log(patients);


  return (
    <div>
      <div className='grid grid-cols-6 gap-4'>
        {
          patients.map((patient) => (
            <Link to={`/dashboard/records/${patient.id}`}>
              <div key={patient.id} className='shadow-md w-4/4 p-2 bg-white rounded-md'>
                <div className='flex items-center gap-4'>
                  <div className=' h-10 w-10 p-3 bg-slate-200'></div>
                  <div>
                    <p className='truncate'>{patient.firstname} {patient.lastname}</p>
                    <p className='text-sm'>{patient.created_at}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      <div>

      </div>
    </div>
  )
}

export default Records