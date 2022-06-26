import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const {
    time,
    id,
    interviewers,
    bookInterview,
    interview,
    cancelInterview
    } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

//Functions to save inteviews making a call to the API calling bookInterview function 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

//Fuction to delete booked interviews
  function destroy(event) {
    if (mode === CONFIRM) {
      transition(DELETING, true);
      cancelInterview(id)
        .then(() => transition(EMPTY))
        .catch(error => transition(ERROR_DELETE, true));
    } else {
      transition(CONFIRM);
    }
  }

  function edit() {
    transition(EDIT);
  }


  return (
    <article>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show key={id}
          {...props}
          onDelete={destroy}
          onEdit={edit}
        />
      )}
      {mode === CREATE && <Form
        interviewers={interviewers}
        onCancel={back}
        onSave={save}
      />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          onCancel={back}
          onConfirm={destroy}
          message="Are you sure you want to delete?"
        />}
      {mode === EDIT &&
        <Form
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message="Could not create appointment"
          onClose={back}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Could not cancel appointment"
          onClose={back}
        />
      }
    </article>
  );
}
