export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayId =>  dayId.name === day);
    if (!dayObj) {
      return [];
    }
    const appointments = dayObj.appointments.map(appointmentsId => state.appointments[appointmentsId]);
    //console.log("appointmnts in selector function: ",appointments)
    return appointments;
  };

  export  function getInterview(state, interview) {
    const foundInterview = {};
    //console.log(state.interviewers,"interview",interview)
    if (interview && interview.interviewer) {
      for (const interviewer in state.interviewers) {
        if ( state.interviewers[interviewer].id === interview.interviewer) {
          foundInterview['student'] = interview.student;
          foundInterview['interviewer'] = state.interviewers[interviewer];
        }
      }
    } else {
      return null;
    }
    //console.log("interviews in selector function: ",foundInterview);
    return foundInterview;
  };

  export function getInterviewersForDay (state, Day) {
    const dayObj = state.days.find(day =>  day.name === Day);
    if (!dayObj) {
      return [];
    }
    const interviewers = dayObj.interviewers.map(interviewrId => state.interviewers[interviewrId]);
    //console.log("interviewers in selector function: ",interviewers);
    return interviewers;
  };