import React, {useState} from 'react';
import './contents.scss'
import {deviceIdToName} from "settings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faGlobe,
    faTemperatureThreeQuarters,
    faDroplet,
    faMicrochip,
    faServer,
    faMemory
} from '@fortawesome/free-solid-svg-icons'


//TODO Retrieve Data from API and Cache them in LocalStorage
function Info({deviceId}) {
    const [state, setState] = useState({
        isOnline: '.',
        lastUpdate: '.',
        temp: '.',
        moisture: '.',
        cpuTemp: '.',
        uptime: '.',
        memUsage: '.',
        cpuUsage: '.'
    })
    return (
        <div className='info'>
            <h1 className="deviceName">{deviceIdToName[deviceId]}</h1>
            <div className="cards">
                <div className='card DetailedInfo'>
                    <h3 className="title">基本情報</h3>
                    <div className="infos">
                        <div className="isOnline indiInfo">
                            <FontAwesomeIcon className="icon" icon={faGlobe}/>
                            <p>疎通:{state.isOnline}</p>
                        </div>
                        <div className="lastUpdate indiInfo">
                            <FontAwesomeIcon className="icon" icon={faCalendar}/>
                            <p>更新:{state.lastUpdate}</p>
                        </div>
                        <div className="temp indiInfo">
                            <FontAwesomeIcon className="icon" icon={faTemperatureThreeQuarters}/>
                            <p>温度:{state.temp}</p>
                        </div>
                        <div className="moisture indiInfo">
                            <FontAwesomeIcon className="icon" icon={faDroplet}/>
                            <p>湿度:{state.moisture}</p>
                        </div>
                        <div className="cpuTemp indiInfo">
                            <FontAwesomeIcon className="icon" icon={faMicrochip}/>
                            <p>CPU温度:{state.cpuTemp}</p>
                        </div>
                        <div className="uptime indiInfo">
                            <FontAwesomeIcon className="icon" icon={faServer}/>
                            <p>稼働時間:{state.uptime}</p>
                        </div>
                        <div className="memUsage indiInfo">
                            <FontAwesomeIcon className="icon" icon={faMemory}/>
                            <p>メモリ使用量:{state.memUsage}</p>
                        </div>
                        <div className="cpuUsage indiInfo">
                            <FontAwesomeIcon className="icon" icon={faMicrochip}/>
                            <p>CPU使用量:{state.cpuUsage}</p>
                        </div>
                    </div>
                    <div className='pictureCard'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;