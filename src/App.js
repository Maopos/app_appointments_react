import React, { Fragment, useState, useEffect } from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';



function App() {

  // LocalStorage 
  let firstAppointments = JSON.parse(localStorage.getItem('appointments'));
  if(!firstAppointments) {
    firstAppointments = [];
  }

  // Appoinments array
  const [ appointments, saveAppointments] = useState(firstAppointments);

  // Use Effect for other actions when state changes
  
  
  useEffect( () => {
    localStorage.setItem( 'appointments', JSON.stringify( appointments ) );
}, [appointments] );


  // Add new Appointment
  const createAppointment = (appointment) => {
    saveAppointments([
      ...appointments, appointment
    ])
    
  }

  // Delete Apponitment by Id.
  const deleteAppointment = (id) =>{
      const newAppointments = appointments.filter(appointment => appointment.id !== id);
      saveAppointments(newAppointments);
  }


  return (
    <Fragment>
      <h1>Appointment manager</h1>

      <div className="container">
          <div className="row">
            <div className="one-half column">
              <Form
                createAppointment={createAppointment}
                />
            </div>
            <div className="one-half column">
              {appointments.length>0 ? <h2>Manage your Appointments</h2> : <h2>Appointments here!</h2>}
              {appointments.map(appointment => (
                <Appointment 
                  key={appointment.id}
                  appointment={appointment}
                  deleteAppointment={deleteAppointment}
                />
              ))}
            </div>
          </div>
      </div>
    </Fragment>
  );
}



export default App;
