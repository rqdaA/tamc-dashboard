import React, {useState} from 'react';

function Button() {

    // state [intact, animating, finished, restarting]
    const [btnState, setBtnState] = useState('intact')
    const handleButton = (e) => {
        if (btnState === 'intact' || btnState === 'restarting') {
            setBtnState('animating')
            // TODO Change this line to API
            setTimeout(() => {
                setBtnState('finished')
                setTimeout(() => setBtnState('restarting'), 1500)
            }, 6800)
        }
    }
    return (
        <div className="btnWrapper">
            <div id="button" className={`button ${btnState}`} onClick={handleButton}>
                {(btnState === 'intact' || btnState === 'restarting') &&
                    <label className="text" htmlFor="button">SHOT</label>}
            </div>
            <div className={`progress_bar ${btnState}`}/>
            {btnState === 'finished' && <svg x="0px" y="0px" viewBox="0 0 25 30">
                <path className="check" d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2"/>
            </svg>
            }
        </div>
    )
}

export default Button;