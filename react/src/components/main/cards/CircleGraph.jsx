import React from 'react';

const CircleGraph = ({text}) => (
    <div className="circleGraph">
        <div className="circle">
            <div className="mask full">
                <div className="fill"></div>
            </div>

            <div className="mask half">
                <div className="fill"></div>
            </div>

            <div className="insideCircle">
                70%
            </div>
        </div>
    </div>
)

export default CircleGraph;