export default function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayId =>  dayId.name === day);
    if (!dayObj) {
      return [];
    }
    const appointments = dayObj.appointments.map(appointmentsId => state.appointments[appointmentsId]);
    return appointments;
  };
