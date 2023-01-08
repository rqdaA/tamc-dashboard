import React, {useState} from 'react';
import './control.scss'

function Control(props) {
    const [state, setState] = useState({
        'ss': 0,
        'iso': 0,
        'f_number': 0
    })
    const handleInput = (event) => {
        const val = event.target.value
        event.preventDefault()
        setState({...state, [event.target.id]: val.length ? parseInt(event.target.value) : NaN})
    }

    const isEmpty = (input) => !isNaN(input);

    return (
        <div className="control">
            <img src="/image.jpg" alt=""/>
            <div className="config">
                <div className="formField">
                    <input id="ss" className={"input " + (isEmpty(state['ss']) ? "filled" : "")} type="number"
                           value={state['ss'].toString()} onChange={handleInput} required/>
                    <label className="label" htmlFor="ss">SS(ms)</label>
                </div>
                <div className="formField">
                    <input id="iso" className={"input " + (isEmpty(state['iso']) ? "filled" : "")} type="number"
                           value={state['iso'].toString()} onChange={handleInput} required/>
                    <label className="label" htmlFor="iso">ISO</label>
                </div>
                <div className="formField">
                    <input id="f_number" className={"input " + (isEmpty(state['f_number']) ? "filled" : "")}
                           type="number" value={state['f_number'].toString()} onChange={handleInput} required/>
                    <label className="label" htmlFor="f_number">F Number</label>
                </div>
            </div>

        </div>
    )
}

export default Control;