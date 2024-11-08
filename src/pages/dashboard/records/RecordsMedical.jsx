import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setRecords } from '../../../redux/Features/Dashboard';
import { IoMdEye } from 'react-icons/io';
import ViewRecord from './ViewRecord';

const RecordsMedical = () => {
  const dispatch = useDispatch();
  const { patient } = useParams();
  const { records } = useSelector((state) => state.dashboard);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await axios.get(`${baseUrl}/patients.php?id=${patient}`);
        const patientData = patientRes.data?.data;

        const ref = patientData?.ref;  
        if (ref) {
          const recordRes = await axios.get(`${baseUrl}/record.php?ref=${ref}`);
          console.log(recordRes);
          
          if (recordRes.status === 200) {
            dispatch(setRecords(recordRes.data));
          } else {
            console.error('Failed to fetch records');
          }
        } else {
          console.warn("Patient reference (ref) is missing");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [dispatch, patient]);

  console.log(records);
  
  const openModal = (modalName, id = null) => {
    setSelectedId(id);
    switch (modalName) {
      case 'view':
        setIsOpenAddModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'view':
        setIsOpenAddModal(false);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const columns = [
    {
      name: 'STAFF',
      selector: row => row.staff,
      sortable: true,
    },
    {
      name: 'TYPE',
      selector: row => row.type,
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
    {
      name: 'ACTIONS',
      cell: row => (
        <div className='flex gap-4'>
          <button
            onClick={() => openModal("view", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <IoMdEye className='text-xl text-green-700' />
          </button>
          {isOpenAddModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl w-full">
                  <ViewRecord closeViewModal={() => closeModal("view")} id={selectedId} />
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <main className='w-full h-full md:px-5 py-3 flex gap-5 overflow-auto'>
      <section className="bg-white w-full h-full rounded-lg px-5">
        <Table
          title="Medical Records"
          columns={columns}
          filter={true}
          data={records || []}  // Default to empty array if records is undefined
        />
      </section>
    </main>
  );
};

export default RecordsMedical;
