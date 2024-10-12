import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Table from '../../../components/Table';
import AddNurse from './AddNurse';
import DeleteNurse from './DeleteNurse';
import EditNurse from './EditNurse';
import { baseUrl } from '../../../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setNurses } from '../../../redux/Features/Dashboard';

const Nurses = () => {
  const dispatch = useDispatch();
  const { nurses } = useSelector((state) => state.dashboard);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${baseUrl}/nurses.php`);
        dispatch(setNurses(res.data.data));
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [dispatch]);

  const openModal = (modalName, id) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddModal(true);
        break;
      case 'edit':
        setSelectedId(id);
        setIsOpenEditModal(true);
        break;
      case 'delete':
        setSelectedId(id);
        setIsOpenDeleteModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddModal(false);
        break;
      case 'edit':
        setIsOpenEditModal(false);
        break;
      case 'delete':
        setIsOpenDeleteModal(false);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const columns = [
    
    {
      name: 'FULL NAME',
      selector: row => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: 'PHONE',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'AGE',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'GENDER',
      selector: row => row.gender,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'REF',
      selector: row => row.ref,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'ACTIONS',
      cell: row => <div className='flex gap-4'>
        <>
          <button
            onClick={() => openModal("edit", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />

          </button>

          {isOpenEditModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditNurse closeEditModal={() => closeModal("edit")} id={selectedId} />
                </div>
              </div>
            </div>
          )}
        </>
        <>
          <button
            onClick={() => openModal("delete", row.id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className='text-xl text-red-700' />
          </button>

          {isOpenDeleteModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteNurse closeDeleteModal={() => closeModal("delete")} id={selectedId} />
                </div>
              </div>
            </div>
          )}
        </>
      </div>,
    },
  ];

  const data = [
    { id: 1, firstname: 'John', lastname: 'Doe', gender: 'Male', address: '12345678', age: 28, ref: "AD12345cd", status: 'Ongoing' },
    { id: 1, firstname: 'John', lastname: 'Doe', gender: 'Male', address: '12345678', age: 28, ref: "AD12345cd", status: 'Ongoing' },
    { id: 1, firstname: 'John', lastname: 'Doe', gender: 'Male', address: '12345678', age: 28, ref: "AD12345cd", status: 'Ongoing' },

    // Add more data here as needed
  ];


  return (
    <main className='w-full h-full bg-white rounded-lg shadow-md p-4'>
      <Table
        title="Nurses"
        label={columns}
        filter={"firstname"}
        data={nurses}
        children={
          <>
            <button
              onClick={() => openModal("add")}
              className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
            >
              <MdAdd className='text-white' /> <p>Add Nurse</p>
            </button>

            {isOpenAddModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <AddNurse closeAddModal={() => closeModal("add")} />
                  </div>
                </div>
              </div>
            )}
          </>
        }
      />
    </main>
  );
}

export default Nurses;
