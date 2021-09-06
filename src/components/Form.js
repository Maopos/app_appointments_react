import React, { Fragment, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Form = ({createAppointment}) => {

    // Create Appointment State
    const [appointment, updateAppointment] = useState({
        pet: '',
        owner: '',
        date: '',
        time: '',
        symptoms: ''
    });

    const [error, updateError] = useState(false)

    // This function is executed when a user writes in an input
    const updateState = (e) => {
        updateAppointment({
            ...appointment, 
            [e.target.name]: e.target.value
        })
        
    }

    // Get values
    const {pet, owner, date, time, symptoms } = appointment;

    // Click on add Appointment button
    const submitAppointment = (e) => {
        e.preventDefault();
        
        // Validate forms
        if (pet.trim() === '' || owner.trim() === '' || date.trim() === '' || time.trim() === '' || symptoms.trim() === '') {
            updateError(true)
            return;
        }
        updateError(false)

        // Assign Id - npm i uuid
        appointment.id = uuidv4();
        
        
        // Create appointment
        createAppointment(appointment)

        // Reload Form
        updateAppointment({
            pet: '',
            owner: '',
            date: '',
            time: '',
            symptoms: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Create appointment.</h2>
            <form 
                action=""
                onSubmit={submitAppointment}
                >
                <label>Pet`s Name</label>
                <input 
                    type="text" 
                    name="pet"
                    className="u-full-width"
                    placeholder="Pet`s Name"
                    onChange={updateState}
                    value={pet}
                />
            
                <label>Pet owner`s name</label>
                <input 
                    type="text" 
                    name="owner"
                    className="u-full-width"
                    placeholder="Pet owner`s name"
                    onChange={updateState}
                    value={owner}
                />
            
                <label>Date</label>
                <input 
                    type="date" 
                    name="date"
                    className="u-full-width"
                    onChange={updateState}
                    value={date}
                />

                <label>Check-in time</label>
                <input 
                    type="time" 
                    name="time"
                    className="u-full-width"
                    onChange={updateState}
                    value={time}
                />

                <label htmlFor="">Symptoms</label>
                <textarea 
                    className="u-full-width" 
                    name="symptoms" 
                    id="" 
                    cols="30" 
                    rows="10"
                    onChange={updateState}
                    value={symptoms}
                ></textarea>
                    

                <button 
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Add appointment
                </button>
            {error ?  <p className="alert-error">All fields are required...</p> : null}
            </form>
        </Fragment>
     );
}

Form.protoTypes = {
    createAppointment: PropTypes.func.isRequired
  }
 
export default Form;