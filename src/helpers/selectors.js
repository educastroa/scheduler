//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
const getAppointmentsForDay = (days, day, appointments) => {
  const currentDays = days.find(el => el.name === day);
  
  return currentDays != null ? currentDays.appointments
    .map(dayId => appointments[dayId]) : [];
};

const getInterview = (interviewers, interview) => {
  if (!interview) {
    return null;
  }

  const interviewerInfo = Object.values(interviewers).find(inter => inter.id === interview.interviewer);
  return {
    student: interview.student,
    interviewer: interviewerInfo
  };
}

const getInterviewersForDay = (days, day, interviewers) => {
  const currentDays = days.find(el => el.name === day);

  return currentDays != null ? currentDays.interviewers
    .map(dayId => interviewers[dayId]) : [];
}

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
};