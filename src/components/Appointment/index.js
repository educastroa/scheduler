import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import { getInterview } from "helpers/selectors";

export default function Appointment({ id, interview, interviewers, time }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const interviewInfo = getInterview(interviewers, interview);

  const onDelete = () => {

  }

  const onEdit = () => {

  }

  return (
    <article>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview != null && interviewInfo != null && (
        <Show 
          key={id} 
          interview={interview}
          interviewInfo={interviewInfo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back}/>}

    </article>
  );
}
