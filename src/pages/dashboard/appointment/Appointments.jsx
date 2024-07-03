import React, { useState } from 'react';
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Table from '../../../components/Table';
import AddAppointment from './AddAppointment';
import DeleteAppointment from './DeleteAppointment';
import EditAppointment from './EditAppointment';

const Appointments = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
      name: 'SERVICE',
      selector: row => row.service,
      sortable: true,
    },
    {
      name: 'DOCTOR',
      selector: row => row.doctor,
      sortable: true,
    },
    {
      name: 'DATE',
      selector: row => row.date,
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
                  <EditAppointment closeEditModal={() => closeModal("edit")} qId={selectedId} />
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
                  <DeleteAppointment closeDeleteModal={() => closeModal("delete")} qId={selectedId} />
                </div>
              </div>
            </div>
          )}
        </>
      </div>,
    },
  ];

  const data = [
    { id: 1, firstname: 'John', lastname: 'Doe', service: 'Fever', doctor: '12345678', date: 28, ref: "AD12345cd", status: 'Ongoing' },
    { id: 1, firstname: 'John', lastname: 'Doe', service: 'Fever', doctor: '12345678', date: 28, ref: "AD12345cd", status: 'Ongoing' },
    { id: 1, firstname: 'John', lastname: 'Doe', service: 'Fever', doctor: '12345678', date: 28, ref: "AD12345cd", status: 'Ongoing' },

    // Add more data here as needed
  ];


  return (
    <main className='w-full h-full px-5 py-3 flex gap-5'>
      <section className="bg-white w-full h-full rounded-lg px-5">
        <Table
          title="Appointments"
          label={columns}
          filter={"ref"}
          data={data}
          children={
            <>
              <button
                onClick={() => openModal("add")}
                className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
              >
                <MdAdd className='text-white' /> <p>Add Appointment</p>
              </button>

              {isOpenAddModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                  <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                      <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <AddAppointment closeAddModal={() => closeModal("add")} />
                    </div>
                  </div>
                </div>
              )}
            </>
          }
        />
      </section>
      <section className="w-2/6 h-full flex flex-col gap-5">
        <div className="bg-white h-2/4 p-10 rounded-lg"></div>
        <div className="bg-white h-2/4 p-10 rounded-lg"></div>
      </section>
    </main>
  );
}

export default Appointments;
