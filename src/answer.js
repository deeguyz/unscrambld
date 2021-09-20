import React, {Fragment, useState, useEffect} from "react";
import './answer.css'

export default function Answer(props) {
    
    const [answer, setAnswer] = useState("incorrect");

    useEffect ( () => {
        if(props.char === ' '){
            setAnswer("space");
        }
    },[props])
    

    const handleChange = e => {
        if(e.target.value === props.char) {
            setAnswer("correct");
            props.setWordCounter(props.wordCounter + 1);
        } else {
            setAnswer("incorrect");
        }
        
    }

    if(props.char === ' ') {
        return(
            <Fragment>
                <input type="text" className={answer} onChange={handleChange} maxLength="1"/>
                <p className="break"/>
            </Fragment>
        )
    } else {
        return (
            <input type="text" className={answer} onChange={handleChange} maxLength="1"/>
        )
    }
}