import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status_deleting';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error_delete';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const add = () => transition(CREATE);
  
  function save(name, interviewer) { 
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

 
  const edit = () => transition(EDIT);
  
  const deleteItem = () => transition(CONFIRM);
  
  const cancel = () => back();
  
  const confirmDelete = () => {

    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
    
	return (
    <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={add} />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
      
        {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={cancel}
          onSave={save}
          />
        )}

        {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteItem}
          onEdit={edit}
        />
        )}
      
        {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?" 
          onCancel={cancel}
          onConfirm={confirmDelete}
        />
        )}

        {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={cancel}
          onSave={save}
          editing={true}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
        />
        )}

        {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment"
          onClose={() => back()}
        />
        )}

        {mode === ERROR_SAVE && (
				<Error
					message="Error in editing the interview"
					onClose={() => back()}
				/>
			  )}
    </article>
	);	
}