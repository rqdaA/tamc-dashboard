import React from 'react';
import './info.scss'
import {deviceIdToName} from "settings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faDroplet,
    faGlobe,
    faMicrochip,
    faServer,
    faTemperatureThreeQuarters
} from '@fortawesome/free-solid-svg-icons'


//TODO Retrieve Data from API and Cache them in LocalStorage
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnline: '.',
            lastUpdate: '.',
            temp: '.',
            moisture: '.',
            cpuTemp: '.',
            uptime: '.',
            memUsage: '.',
            cpuUsage: '.'
        }
    }

    componentDidMount() {
        setInterval(() => this.tick(), 1500)
    }

    tick() {
        this.setState(state => {
            let newState = {...state}
            for (let key in newState) {
                let val = newState[key]
                if (!val.replaceAll('.', '').length) {
                    if (val.length === 3) val = ''
                    else val += '.'
                }
                newState[key] = val
            }
            return newState
        })
    }


    render() {
        return (
            <div className='info'>
                <h1 className="deviceName">{deviceIdToName[this.props.deviceId]}</h1>
                <div className="cards">
                    <div className='card DetailedInfo'>
                        <h3 className="title">基本情報</h3>
                        <div className="infos">
                            <div className="isOnline indiInfo">
                                <FontAwesomeIcon className="icon" icon={faGlobe}/>
                                <p>疎通:{this.state.isOnline}</p>
                            </div>
                            <div className="lastUpdate indiInfo">
                                <FontAwesomeIcon className="icon" icon={faCalendar}/>
                                <p>更新:{this.state.lastUpdate}</p>
                            </div>
                            <div className="temp indiInfo">
                                <FontAwesomeIcon className="icon" icon={faTemperatureThreeQuarters}/>
                                <p>温度:{this.state.temp}</p>
                            </div>
                            <div className="moisture indiInfo">
                                <FontAwesomeIcon className="icon" icon={faDroplet}/>
                                <p>湿度:{this.state.moisture}</p>
                            </div>
                            <div className="cpuTemp indiInfo">
                                <FontAwesomeIcon className="icon" icon={faMicrochip}/>
                                <p>CPU温度:{this.state.cpuTemp}</p>
                            </div>
                            <div className="uptime indiInfo">
                                <FontAwesomeIcon className="icon" icon={faServer}/>
                                <p>稼働時間:{this.state.uptime}</p>
                            </div>
                        </div>
                        <div className='pictureCard'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info;