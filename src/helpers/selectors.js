const equalAppointments = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
}

//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
  state.days.map(element => {
    if (element.name === day) {
      element.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return equalAppointments(state.appointments, appointmentArr);

}