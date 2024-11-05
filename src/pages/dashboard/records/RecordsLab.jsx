import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


const RecordsLab = () => {
  const dispatch = useDispatch();

  const { patient } = useParams();
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);

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
          const appointmentRes = await axios.get(`${baseUrl}/result.php?ref=${patientData.ref}`);
          console.log(appointmentRes.data);

          if (appointmentRes.status === 200) {
            setResult(appointmentRes.data)
          } else {
            console.error('Failed to fetch results');
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
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'FILE',
      selector: row => row.file,
      sortable: true,
    },
    {
      name: 'REF',
      selector: row => row.ref,
      sortable: true,
    },
    {
      name: 'CREATE',
      selector: row => row.created_at,
      sortable: true,
    },
  ];



  return (
    <main className='w-full h-full md:px-5 py-3 flex gap-5 overflow-auto'>
      <section className="bg-white w-full h-full rounded-lg px-5">
        <Table
          title={"Results"}
          columns={columns}
          filter={true}
          data={result}
        />
      </section>
    </main>
  )
}

export default RecordsLab