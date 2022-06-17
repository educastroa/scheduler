import React from "react";
import classNames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const AvailableDays = props.days.map(day => {
    return (
      <DayListItem
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{AvailableDays}</ul>
}