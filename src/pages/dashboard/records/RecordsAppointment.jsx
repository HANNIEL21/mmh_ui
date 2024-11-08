import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import { setAppointments } from '../../../redux/Features/Dashboard';


const RecordsAppointment = () => {
  const dispatch = useDispatch();
  const {appointments} = useSelector((state)=>state.dashboard);

  const { patient } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await axios.get(`${baseUrl}/patients.php?id=${patient}`);
        const patientData = patientRes.data?.data;

        console.log(patientData?.ref);

        if (patientData?.ref) {
          const appointmentRes = await axios.get(`${baseUrl}/appointment.php?ref=${patientData.ref}`);
          console.log(appointmentRes);

          if (appointmentRes.status === 200) {
            console.log(appointmentRes.data?.data);
            
            dispatch(setAppointments(appointmentRes.data?.data));
          } else {
            console.error('Failed to fetch appointments');
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [dispatch, patient]);


  console.log(appointments);
  

  const columns = [
    {
      name: 'FULL NAME',
      selector: row => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: 'TYPE',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'TIME',
      selector: row => row.time,
      sortable: true,
    },
    {
      name: 'DATE',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'CODE',
      selector: row => row.code,
      sortable: true,
    },
    {
      name: 'REF',
      selector: row => row.ref,
      sortable: true,
    },
  ];



  return (
    <main className='w-full h-full lg:px-5 py-3 flex gap-5 overflow-auto'>
      <section className="bg-white w-full h-full rounded-lg px-5">
        <Table
          title={"Appointment"}
          columns={columns}
          data={appointments}
          filter={true}
        />
      </section>
    </main>
  )
}

export default RecordsAppointment