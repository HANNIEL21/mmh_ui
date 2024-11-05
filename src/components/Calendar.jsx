import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const EventCalendar = ({events}) => {

  return (
    <div className="p-3 md:p-5 bg-white rounded-lg shadow-md h-[100vh] md:h-auto lg:h-[100vh] min-h-[400px] overflow-auto">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,today,next',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        editable={true}
        selectable={true}
        // eventClick={(info) => alert(`Event: ${info.event.title}`)}
        height="100%"
        contentHeight="auto"
      />
    </div>
  );
};

export default EventCalendar;
