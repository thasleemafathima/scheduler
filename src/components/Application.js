import React, { useState, useEffect } from "react";

import "components/Application.scss";

import Appointment from 'components/Appointment';

import DayList from "components/DayList";
import axios from 'axios';

import getAppointmentsForDay from "helpers/selectors";
import getInterview from "helpers/selectors1"
import getInterviewersForDay from "helpers/selectors3";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
    useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers'),
      ]).then((all) => {
        console.log(all,"thas");
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  let newAppointments = getAppointmentsForDay(state, state.day);
  const schedule = newAppointments.map((appointment) => { 
  const interview = getInterview(state, appointment.interview);  
  const interviewers = getInterviewersForDay(state, state.day);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
    />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}
      </section>
    </main>
  );
}