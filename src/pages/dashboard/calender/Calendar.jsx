import React, { useEffect, useState } from 'react';
import EventCalendar from '../../../components/Calendar';
import { FiDelete, FiEdit, FiList, FiPlus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import AddEvent from './AddEvent';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { setEvents } from '../../../redux/Features/Dashboard';
import EditEvent from './EditEvent';

const Calendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.dashboard);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${baseUrl}/events.php`);
        if (res.status === 200) {
          console.log(res.data.data);
          dispatch(setEvents(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [dispatch]);

  const openModal = (modalName, id = null) => {
    setSelectedId(id);
    switch (modalName) {
      case 'add':
        setIsOpenAddModal(true);
        break;
      case 'edit':
        setIsOpenEditModal(true);
        break;
      case 'delete':
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

  const toggleList = () => setIsListOpen(!isListOpen);

  return (
    <div className="h-full w-full flex relative">
      {/* Calendar Section */}
      <div className={`${isListOpen ? 'hidden lg:w-3/4 lg:flex' : 'w-full'} h-full transition-all`}>
        <EventCalendar events={events || []} />
      </div>

      {/* Event List Sidebar */}
      {isListOpen && (
        <div className={`${isListOpen ? 'w-full lg:w-1/4' : 'hidden'} h-full p-4 overflow-y-auto`}>
          <h2 className="font-bold text-2xl mb-4 uppercase">Event List</h2>
          {events.map((item, i) => (
            <div key={i} className="mb-3 p-2 flex justify-between items-center bg-white rounded shadow">
              <div className="flex flex-col">
                <p className="font-bold text-appColor uppercase">{item.title}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal('edit', item.id)}
                  className="bg-green-500 flex items-center gap-2 text-white font-bold text-sm rounded-md p-3 focus:outline-none"
                >
                  <FiEdit className="text-white text-lg" />
                </button>
                <button
                  onClick={() => openModal('delete', item.id)}
                  className="bg-red-500 flex items-center gap-2 text-white font-bold text-sm rounded-md p-3 focus:outline-none"
                >
                  <FiDelete className="text-white text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="absolute flex flex-col gap-2 z-20 bottom-14 right-8">
        <button
          onClick={() => openModal('add')}
          className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md p-3 focus:outline-none"
        >
          <FiPlus className="text-white text-lg" />
        </button>

        <button
          onClick={toggleList}
          className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md p-3 focus:outline-none"
        >
          <FiList className="text-white text-lg" />
        </button>
      </div>

      {/* Add Event Modal */}
      {isOpenAddModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center min-h-screen p-4 bg-slate-600 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <AddEvent closeAddModal={() => closeModal('add')} />
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {isOpenEditModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center min-h-screen p-4 bg-slate-600 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <EditEvent id={selectedId} closeEditModal={() => closeModal('edit')}/>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {isOpenDeleteModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center min-h-screen p-4 bg-slate-600 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            {/* Add your DeleteEvent component here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
