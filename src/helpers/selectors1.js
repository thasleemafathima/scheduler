export default function getInterview(state, interview) {
  const foundInterview = {};
  if (interview) {
    for (const interviewer in state.interviewers) {
      if ( state.interviewers[interviewer].id === interview.interviewer) {
        foundInterview['student'] = interview.student;
        foundInterview['interviewer'] = state.interviewers[interviewer];
      }
    }
  } else {
    return null;
  }
  console.log("basha",foundInterview);
  return foundInterview;
};
