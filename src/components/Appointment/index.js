import React, { Fragment } from "react";
import classNames from "classnames";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty"



export default function Appointment(props) {
  
   return (
     <article>
    <Header time={props.time}/>
    {!props.interview ? (<Empty/>) : (<Show key={props.id} {...props}/>)}
    
    </article>
   );
 }
