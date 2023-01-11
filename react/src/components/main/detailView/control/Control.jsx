import React, {useState} from 'react';
import './control.scss'
import Form from './Form'
import Button from "./Button";

function Control(props) {
    const [state, setState] = useState({
        'ss': 0,
        'iso': 0,
        'f_number': 0
    })

    function onInput(key, val) {
        setState({...state, [key]: val})
    }

    return (
        <div className="control">
            <img src="/image.jpg" alt=""/>
            <div className="config">
                <div className="forms">
                    <Form labelName="SS(ms)" id="ss" val={state['ss']} inputHandler={onInput}/>
                    <Form labelName="ISO" id="iso" val={state['iso']} inputHandler={onInput}/>
                    <Form labelName="F Number" id="f_number" val={state['f_number']} inputHandler={onInput}/>
                </div>
                <Button/>
            </div>
        </div>
    )
}

export default Control;