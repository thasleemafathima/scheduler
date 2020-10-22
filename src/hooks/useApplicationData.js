import { useState, useEffect } from "react";
import axios from 'axios';

function recalculateRemainingSpots(days, appointments) {
  return days.map(dayObj => ({
    ...dayObj,
    spots: dayObj.appointments
      .map(id => appointments[id])
      .filter(appointment => !appointment.interview)
      .length
  })
  )
}
export default function useApplicationData() {

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
      //console.log("check the state value: ",all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  })
}, [])



const bookInterview = (id, interview) => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
 
  setState({...state, appointments, days: recalculateRemainingSpots(state.days, appointments)});
  return axios.put(`/api/appointments/${id}`, { interview: interview });
}

const cancelInterview = (id) => {
  const appointments = { ...state.appointments };
  appointments[id].interview = null;
  setState({...state, appointments, days: recalculateRemainingSpots(state.days, appointments)});
  return axios.delete(`/api/appointments/${id}`);
 
}

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}