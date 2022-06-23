import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const formatSpots = function (spots) {
  if (!spots) {
    return `no spots remaining`;
  }
  if (spots === 1) {
    return `1 spot remaining`;
  }
  return `${spots} spots remaining`;
};


export default function DayListItem(props) {
  const { selected, spots, name, setDay } = props;

  const spotsAvailable = formatSpots(props.spots);

  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': !spots
  });

  return (
    <li
      className={dayClass}
      onClick={() => setDay(name)}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsAvailable}</h3>
    </li>
  );
}