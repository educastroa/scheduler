import React from "react";
import axios from "axios";
import Appointment from './Appointment';
import DayList from "./DayList";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default class Application extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
      dailyAppointments: [],
      dailyInterviwers: [],
    }
  }

  setDay = day => this.setState({ ...this.state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  componentDidMount() {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      this.setState(prev => ({ 
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
        dailyAppointments: getAppointmentsForDay(all[0].data, this.state.day, all[1].data),
        dailyInterviwers: getInterviewersForDay(all[0].data, this.state.day, all[2].data)
      }));

    });
  };
  
  render() {
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
            days={this.state.days}
            day={this.state.day}
            setDay={this.setDay} />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
        <section className="schedule">
          {this.state.dailyAppointments.map(appointment =>
            <Appointment
              key={appointment.id}
              {...appointment}
              interviewInfo={getInterview(this.state, appointment.interview)}
              interviewers={this.state.dailyInterviwers}
            />)}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    );
  }
}
