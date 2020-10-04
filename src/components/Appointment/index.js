import React from 'react'

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from 'components/Appointment/Form';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const add = () => transition(CREATE);

  const cancel = () => back();

   
	return (
    <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={add} />}
          
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={cancel}
          />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      
   </article>
	);	
}