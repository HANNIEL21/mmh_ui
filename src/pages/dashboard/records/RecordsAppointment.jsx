import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Table from '../../../components/Table';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { setAppointments } from '../../../redux/Features/Dashboard';
import { useParams } from 'react-router-dom';


const RecordsAppointment = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.dashboard);

  const { patient } = useParams();
  const [data, setData] = useState({});
  const [appointment, setAppointment] = useState({});

  console.log(patient);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await axios.get(`${baseUrl}/patients.php?id=${patient}`);
        const patientData = patientRes.data?.data;
        setData(patientData);

        console.log(patientData?.ref);  // Log ref from patient data

        // Only proceed if patientData has a reference (ref)
        if (patientData?.ref) {
          const appointmentRes = await axios.get(`${baseUrl}/appointment.php?ref=${patientData.ref}`);
          console.log(appointmentRes);

          if (appointmentRes.status === 200) {
            setAppointment(appointmentRes.data?.data)
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
    <main className='w-full h-full px-5 py-3 flex gap-5'>
      <section className="bg-white w-full h-full rounded-lg px-5">
        <Table
          title={"Appointments"}
          label={columns}
          filter={"code"}
          showFilter={false}
          data={appointment}
        />
      </section>
    </main>
  )
}

export default RecordsAppointment