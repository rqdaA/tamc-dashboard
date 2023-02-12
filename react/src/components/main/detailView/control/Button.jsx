import React, {useRef, useState} from 'react';

function Button({handler}) {

    // state=[intact, animating, finished, restarting]
    const [btnState, setBtnState] = useState('intact')
    const [btnFocusable, setBtnFocusable] = useState(true)
    const btn = useRef(null)
    const handleButton = () => {
        if (btnState === 'intact' || btnState === 'restarting') {
            setBtnState('animating')
            handler().then(
                () => {
                    setBtnState('finished')
                    setTimeout(() => {
                        setBtnFocusable(true)
                        setBtnState('restarting')
                    }, 1500)
                }
            )
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            btn.current.blur()
            handleButton()
        }
    }
    return (
        <div className="btnWrapper">
            <div id="button" className={`button ${btnState}`} onClick={handleButton}
                 onKeyDown={handleKeyDown} tabIndex={btnFocusable ? 0 : -1} ref={btn}>
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