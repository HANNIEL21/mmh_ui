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

  console.log(patient);
  

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${baseUrl}/appointment.php?id=${patient.ref}`);
      if (res.status === 200) {
        dispatch(setAppointments(res.data?.data));
      } else {
        console.error('Failed to fetch appointments');
      }
    };
    fetch();
  }, [dispatch]);


  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
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
          label={columns}
          filter={"code"}
          showFilter={false}
          data={appointments}
        />
      </section>
    </main>
  )
}

export default RecordsAppointment