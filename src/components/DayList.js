import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
const { days, setDay } = props

  const AvailableDays = days.map(day => {
    return (
      <DayListItem
        key={day.id}
        selected={day.name === day}
        setDay={setDay}
        {...day}
      />
    );
  });
  return <ul>{AvailableDays}</ul>;
}