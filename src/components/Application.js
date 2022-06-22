import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from './Appointment';
import DayList from "./DayList";
import "components/Application.scss";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const [dailyInfo, setDailyInfo] = useState({
    appointments: [],
    interviewers: [],
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      setState({ 
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  useEffect(() => {
    setDailyInfo({
      appointments: getAppointmentsForDay(state.days, state.day, state.appointments),
      interviewers: getInterviewersForDay(state.days, state.day, state.interviewers)
    });
  }, [state.days, state.day, state.appointments, state.interviewers]);
  
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
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyInfo.appointments.map(appointment =>
          <Appointment
            key={appointment.id}
            {...appointment}
            interviewers={dailyInfo.interviewers}
            bookInterview={bookInterview()}
          />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}