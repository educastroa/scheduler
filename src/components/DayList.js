import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const AvailableDays = props.days.map(day => {
    return (
      <DayListItem
        key={day.id} 
        selected={day.name === props.day}
        setDay= {props.setDay}
        {...day}
      />
    );
  });
  return <ul>{AvailableDays}</ul>
}