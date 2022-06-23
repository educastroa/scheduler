import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';


import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const { value, onChange, interviewers } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers.map(interviewer =>
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === value}
          setInterviewer={(event) => onChange(interviewer.id)}

        />
      )}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};