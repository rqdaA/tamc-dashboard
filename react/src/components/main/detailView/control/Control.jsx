import React, {useState} from 'react';
import './control.scss'

function Control(props) {
    const [state, setState] = useState({
        'ss': 0,
        'iso': 0,
        'f_number': 0
    })
    // state [intact, animating, finished]
    const [btnState, setBtnState] = useState('intact')
    const handleButton = (e) => {
        setBtnState('animating')
        // TODO Change this line to API
        setTimeout(() => setBtnState('finished'), 6800)
    }
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
                <div className="forms">
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
                <div className="btnWrapper">
                    <div id="button" className={`button ${btnState}`} onClick={handleButton}>
                        {btnState === 'intact' && <label className="text" htmlFor="button">SHOT</label>}
                    </div>
                    <div className={`progress_bar ${btnState}`}/>
                    {btnState === 'finished' &&
                        <svg x="0px" y="0px" viewBox="0 0 25 30">
                            <path className="check" d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2"/>
                        </svg>
                    }
                </div>
            </div>
        </div>
    )
}

export default Control;