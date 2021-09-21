import React, {Fragment, useState, useEffect} from "react";
import './answer.css'

export default function Answer(props) {
    
    const [answer, setAnswer] = useState("incorrect");
    const [length, setLength] = useState(0);


    useEffect ( () => {
        if(props.char === ' '){
            setAnswer("space");
        }
    },[props.setWordCounter, props.char])

    useEffect ( () => {
        console.log("length: " + length)
        console.log("props.index: " + props.index);
        console.log("UseEffect running");
        if(length === props.index +1) {
            console.log("UseEffect if statement");
            props.inputRef.current.focus();
        }
        
    },[length])
    

    const handleChange = e => {
        if(e.target.value === props.char) {
            setAnswer("correct");
            props.setWordCounter(props.wordCounter + 1);
            setLength(length +1);
        } else {
            setAnswer("incorrect");
        }
        
    }

    if(props.char === ' ') {
        return(
            <Fragment>
                <input type="text" ref={props.inputRef} className={answer} onChange={handleChange} maxLength="1"/>
                <p className="break"/>
            </Fragment>
        )
    } else {
        return (
            <input type="text" ref={props.inputRef} className={answer} onChange={handleChange} maxLength="1"/>
        )
    }
}