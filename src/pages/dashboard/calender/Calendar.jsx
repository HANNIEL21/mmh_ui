import React, { useEffect, useState } from 'react';
import EventCalendar from '../../../components/Calendar';
import { FiPlus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import AddEvent from './AddEvent';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import { setEvents } from '../../../redux/Features/Dashboard';

const Calendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.dashboard);

  useEffect(()=>{
    const fetch = async() => {
      try {
        const res = await axios.get(`${baseUrl}/events.php`);
        if(res.status === 200){
          console.log(res.data.data);
          dispatch(setEvents(res.data.data));
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetch();
  },[])

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const openModal = () => setIsOpenAddModal(true);
  const closeModal = () => setIsOpenAddModal(false);

  return (
    <div className="h-full">
      <EventCalendar events={events || []} />

      <div className="absolute z-20 bottom-14 right-8">
        <button
          onClick={openModal}
          className="bg-appColor flex items-center gap-2 text-white font-bold text-sm rounded-md p-3 focus:outline-none"
        >
          <FiPlus className="text-white text-lg" />
        </button>

        {isOpenAddModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center min-h-screen p-4 bg-slate-600 bg-opacity-75">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <AddEvent closeAddModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
