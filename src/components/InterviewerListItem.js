import React from "react";

import "components/InterviewerListItem.scss";

var classNames = require('classnames');


export default function InterviewerListItem(props) {

  const interviewersClass =  classNames("interviewers__item ", {
    "interviewers__item" : true,
    "interviewers__item--selected": props.selected

  });
  return (
    <li className={interviewersClass} selected={props.selected} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  
  );
}

