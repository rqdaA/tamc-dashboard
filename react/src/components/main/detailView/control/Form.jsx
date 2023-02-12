import React from 'react';

function Form({labelName, id, val, inputHandler, onFinish, autofocus}) {
    const onChange = (event) => {
        if (/^\d*\.?\d?/.test(event.target.value))
            inputHandler(event.target.id, event.target.value)
    }

    return (
        <div className="formField">
            <input id={id} className={"input " + (val ? "filled" : "")} type="text"
                   value={val} onChange={onChange} onBlur={() => onFinish(id, val)} autoFocus={autofocus}/>
            <label className="label" htmlFor={id}>{labelName}</label>
        </div>
    );
}

export default Form;