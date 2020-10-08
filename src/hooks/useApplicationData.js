import { useState, useEffect } from "react";
import axios from 'axios';


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
 
  if(state.appointments[id].interview === null) {
    changeSpots(-1);
  }
  
  setState({...state, appointments});
  return axios.put(`/api/appointments/${id}`, { interview: interview });
}

const cancelInterview = (id) => {
  const appointments = { ...state.appointments };
  appointments[id].interview = null;
  changeSpots(1);
  setState({...state, appointments});
  return axios.delete(`/api/appointments/${id}`);
 
}

function changeSpots (change) {
  const myDay = state.days.find((d)=> d.name === state.day )
    myDay.spots = myDay.spots + change ;
    const dayId = myDay.id;
    const days = [...state.days]
    days[dayId] = myDay;
}

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}