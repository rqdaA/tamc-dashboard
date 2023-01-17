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
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import CircleGraph from "../../common/CircleGraph";

const logText = `[23-01-17 08:00:11] Traceback (most recent call last):
  File "/home/pi/obs-device/via_shellscript/obs_once.py", line 66, in <module>
    bot = slackbot.App(tokens['slack_user_token'])
KeyError: 'slack_user_token'`
const data = [
    {date: '24h', temperature: Math.round(Math.random() * 50),},
    {date: '21h', temperature: Math.round(Math.random() * 50),},
    {date: '18h', temperature: Math.round(Math.random() * 50),},
    {date: '15h', temperature: Math.round(Math.random() * 50),},
    {date: '12h', temperature: Math.round(Math.random() * 50),},
    {date: '9h', temperature: Math.round(Math.random() * 50),},
    {date: '6h', temperature: Math.round(Math.random() * 50),},
    {date: '3h', temperature: Math.round(Math.random() * 50),},
    {date: '0h', temperature: Math.round(Math.random() * 50),},
];


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
        this.id = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.id)
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
        return (<div className='info'>
            <h1 className="deviceName">{deviceIdToName[this.props.deviceId]}</h1>
            <div className="cards">
                <div className='card detailedInfo'>
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

                <div className="card useRate">
                    <h3 className="title">使用率</h3>
                    <div className="circles">
                        <CircleGraph text="74%"/>
                        <CircleGraph text="30%"/>
                    </div>
                    <div className="circleDesc">
                        <p className="description">/</p>
                        <p className="description">/mnt/usb1</p>
                    </div>
                </div>

                <div className="card logs">
                    <h3 className="title">撮影ログ</h3>
                    <p>{logText}</p>
                </div>
                <div className="card logs">
                    <h3 className="title">撮影エラーログ</h3>
                    <p>{logText}</p>
                </div>
                <div className="card cpuGraph">
                    <h3 className="title">CPU使用率グラフ</h3>
                    <ResponsiveContainer width="100%" aspect={4}>
                        <LineChart width="100%" height="100%" data={data}>
                            <Line type="monotone" dataKey="temperature" stroke="#FFFFFF" strokeWidth={2}/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="card memGraph">
                    <h3 className="title">メモリ使用率グラフ</h3>
                    <ResponsiveContainer width="100%" aspect={4}>
                        <LineChart width="100%" height="100%" data={data}>
                            <Line type="monotone" dataKey="temperature" stroke="#FFFFFF" strokeWidth={2}/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>)
    }
}

export default Info;