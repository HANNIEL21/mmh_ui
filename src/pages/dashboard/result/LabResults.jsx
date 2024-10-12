import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import Table from '../../../components/Table';
import { baseUrl } from '../../../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setResults } from '../../../redux/Features/Dashboard';
import DeleteResult from './DeleteResult';
import AddResult from './AddResult';

const Staffs = () => {
  const dispatch = useDispatch();
  
  const { results } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await axios.get(`${baseUrl}/result.php`);
        console.log(res.data);
        
        dispatch(setResults(res.data));
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
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'REF',
      selector: row => row.ref,
      sortable: true,
    },
    {
      name: 'FILE',
      selector: row => row.file ,
      sortable: true,
    },
    {
      name: 'CREATED',
      selector: row => row.created_at,
      sortable: true,
    },
    {
      name: 'ACTIONS',
      cell: row => <div className='flex gap-4'>
        
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
                  <DeleteResult closeDeleteModal={() => closeModal("delete")} id={selectedId} />
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
        title="Results"
        label={columns}
        filter={"ref"} 
        showFilter={true}
        data={results}
        children={
          <>
            <button
              onClick={() => openModal("add")}
              className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md px-3 py-1 focus:outline-none"
            >
              <MdAdd className='text-white' /> <p>Add Result</p>
            </button>

            {isOpenAddModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <AddResult closeAddModal={() => closeModal("add")} />
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
