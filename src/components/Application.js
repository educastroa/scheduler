import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from './Appointment';
import DayList from "./DayList";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviwers = getInterviewersForDay(state, state.day);

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
        {dailyAppointments.map(appointment =>
          <Appointment
            key={appointment.id}
            {...appointment}
            interviewInfo={getInterview(state, appointment.interview)}
            interviewers={dailyInterviwers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
