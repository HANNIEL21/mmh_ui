import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Table from '../../../components/Table';
import AddAppointment from './AddAppointment';
import DeleteAppointment from './DeleteAppointment';
import EditAppointment from './EditAppointment';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { setAppointments } from '../../../redux/Features/Dashboard';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.dashboard);

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
    {
      name: 'ACTIONS',
      cell: row => (
        <div className='flex gap-4'>
          {/* Edit button */}
          <button
            onClick={() => openModal("edit", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />
          </button>

          {isOpenEditModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <EditAppointment closeEditModal={() => closeModal("edit")} id={selectedId} />
                </div>
              </div>
            </div>
          )}

          {/* Delete button */}
          <button
            onClick={() => openModal("delete", row.id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className='text-xl text-red-700' />
          </button>

          {isOpenDeleteModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <DeleteAppointment closeDeleteModal={() => closeModal("delete")} qId={selectedId} />
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  const upcomingAppointments = appointments?.filter((appointment) => new Date(appointment.date) >= new Date());
  const pastAppointments = appointments?.filter((appointment) => new Date(appointment.date) < new Date());

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${baseUrl}/appointment.php`);
      if (res.status === 200) {
        dispatch(setAppointments(res.data?.data));
      } else {
        console.error('Failed to fetch appointments');
      }
    };
    fetch();
  }, [dispatch]);

  return (
    <main className='w-full h-full px-5 py-3 flex gap-5'>
      <section className="bg-white w-full h-full rounded-lg px-5">
        <Table
          title="Appointments"
          label={columns}
          filter={"code"}
          showFilter={true}
          data={appointments}
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
        <div className="bg-white h-2/4 rounded-lg">
          <div className='bg-appColor p-2 rounded-t-lg'>
            <h3 className="font-bold text-white ">Upcoming Appointments</h3>
          </div>
          <div className='p-2 flex flex-col gap-1 overflow-auto'>
            {upcomingAppointments?.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-2 rounded-md bg-appColor bg-opacity-20 flex items-center justify-between">
                  <p className='font-bold capitalize'>{appointment.firstname} {appointment.lastname}</p>
                  <p>{appointment.date} at {appointment.time}</p>
                </div>
              ))
            ) : (
              <p>No upcoming appointments</p>
            )}
          </div>
        </div>

        <div className="bg-white h-2/4 rounded-lg">
          <div className='bg-appColor p-2 rounded-t-lg'>
            <h3 className="font-bold text-white ">Past Appointments</h3>
          </div>
          <div className='p-2 flex flex-col gap-1 overflow-auto'>
            {pastAppointments?.length > 0 ? (
              pastAppointments.map((appointment) => (
                <div key={appointment.id} className="p-2 rounded-md bg-appColor bg-opacity-20 flex items-center justify-between">
                  <p className='font-bold capitalize'>{appointment.firstname} {appointment.lastname}</p>
                  <p>{appointment.date} at {appointment.time}</p>
                </div>
              ))
            ) : (
              <p>No past appointments</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Appointments;
