const equalIds = function (appointments, ids) {
  const matched = ids.map(id => appointments[id]);
  return matched;
};

//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
const getAppointmentsForDay = function (state, day) {
  let appointmentArr = [];
  state.days.map(element => {
    if (element.name === day) {
      element.appointments.forEach(apptId => appointmentArr.push(apptId));
    }
  });

  return equalIds(state.appointments, appointmentArr);
};

const getInterview = function (state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  };
};

function getInterviewersForDay(state, day) {

  let interviewersArr = [];
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId));
    }
  });
  return equalIds(state.interviewers, interviewersArr);
}


module.exports = {
  getAppointmentsForDay,
  equalIds,
  getInterview,
  getInterviewersForDay
};