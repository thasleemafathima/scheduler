export default function getInterviewersForDay (state, Day) {
  const dayObj = state.days.find(day =>  day.name === Day);
  if (!dayObj) {
    return [];
  }
  const interviewers = dayObj.interviewers.map(interviewrId => state.interviewers[interviewrId]);
  return interviewers;
};