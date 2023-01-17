import React from 'react';
import './circleGraph.scss'

function CircleGraph({text}) {
    const regex = /\d+%/
    const input = text.trim()
    let colorClass = 'none'
    let rotateDeg = {
        transform: `rotate(0deg)`
    }
    if (regex.test(input)) {
        const number = parseInt(input.replace("%", ""))
        if (0 <= number <= 100) {
            if (number < 70) colorClass = 'lev0'
            else if (number < 90) colorClass = 'lev1'
            else colorClass = 'lev2'
            rotateDeg['transform'] = `rotate(${180 * (number / 100)}deg)`
        }
    }

    return (
        <div className="circleGraph">
            <div className="circle">
                <div style={rotateDeg} className="mask full">
                    <div style={rotateDeg} className={`fill ${colorClass}`}></div>
                </div>
                <div className="mask half">
                    <div style={rotateDeg} className={`fill ${colorClass}`}></div>
                </div>

                <div className="insideCircle">{text}</div>
            </div>
        </div>
    )
}

export default CircleGraph;