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
        console.log(res.data.data);
        if (res.status === 200) {
          dispatch(setStaffs(res.data.data));
        }
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
      cell: row => (
        <div className="text-sm md:text-base truncate" style={{ width: '350px' }}>
          {`${row.firstname} ${row.lastname}`}
        </div>
      ),
    },
    {
      name: 'PHONE',
      selector: row => row.phone,
      sortable: true,
      cell: row => <div className="text-sm md:text-base">{row.phone}</div>,
    },
    {
      name: 'ROLE',
      selector: row => row.role,
      sortable: true,
      cell: row => (
        <div className="text-sm md:text-base" style={{ width: '70px' }}>
          {row.role}
        </div>
      ),
    },
    {
      name: 'GENDER',
      selector: row => row.gender,
      sortable: true,
      cell: row => (
        <div className="text-sm md:text-base" style={{ width: '50px' }}>
          {row.gender}
        </div>
      ),
    },
    {
      name: 'ADDRESS',
      selector: row => row.address,
      sortable: true,
      cell: row => (
        <div className="text-sm md:text-base truncate" style={{ width: '350px' }}>
          {row.address}
        </div>
      ),
    },
    {
      name: 'ACTIONS',
      cell: row => (
        <div className="flex gap-4">
          <button
            onClick={() => openModal("edit", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />
          </button>
          <button
            onClick={() => openModal("delete", row.id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className='text-xl text-red-700' />
          </button>
        </div>
      ),
    },
  ];




  return (
    <main className='w-full h-full bg-white rounded-lg shadow-md p-4 overflow-auto'>
      <Table
        title="Staffs"
        columns={columns}
        filter={true}
        data={staffs}
        children={
          <>
            <button
              onClick={() => openModal("add")}
              className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md p-1 focus:outline-none"
            >
              <MdAdd className='text-white text-3xl' />
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
