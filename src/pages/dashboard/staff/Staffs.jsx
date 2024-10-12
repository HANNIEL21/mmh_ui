import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Table from '../../../components/Table';
import AddStaff from './AddStaff';
import DeleteStaff from './DeleteStaff';
import EditStaff from './EditStaff';
import { baseUrl } from '../../../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setStaffs } from '../../../redux/Features/Dashboard';

const Staffs = () => {
  const dispatch = useDispatch();
  
  const { staffs } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await axios.get(`${baseUrl}/staff.php`);
        console.log(res);
        
        dispatch(setStaffs(res.data.data));
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };

    fetchStaffs();
  }, [dispatch]);

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
      name: 'ROLE',
      selector: row => row.role ,
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
                  <EditStaff closeEditModal={() => closeModal("edit")} id={selectedId} />
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
                  <DeleteStaff closeDeleteModal={() => closeModal("delete")} id={selectedId} />
                </div>
              </div>
            </div>
          )}
        </>
      </div>,
    },
  ];



  return (
    <main className='w-full h-full bg-white rounded-lg shadow-md p-4'>
      <Table
        title="Staffs"
        label={columns}
        filter={"firstname"} 
        showFilter={true}
        data={staffs}
        children={
          <>
            <button
              onClick={() => openModal("add")}
              className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
            >
              <MdAdd className='text-white' /> <p>Add Staff</p>
            </button>

            {isOpenAddModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <AddStaff closeAddModal={() => closeModal("add")} />
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

export default Staffs;
