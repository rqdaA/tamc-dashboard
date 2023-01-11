import React from 'react';

function Form({labelName, id, val, inputHandler}) {
    const handleInput = (event) => {
        const val = event.target.value
        inputHandler(event.target.id, val.length ? parseInt(event.target.value) : NaN)
    }
    const isEmpty = (input) => isNaN(input);
    return (
        <div className="formField">
            <input id={id} className={"input " + (!isEmpty(val) ? "filled" : "")} type="number"
                   value={val.toString()} onChange={handleInput}/>
            <label className="label" htmlFor={id}>{labelName}</label>
        </div>
    );
}

export default Form;