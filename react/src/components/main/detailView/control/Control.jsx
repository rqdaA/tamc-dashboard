import React, {useEffect, useState} from 'react';
import './control.scss'
import Form from './Form'
import Button from "./Button";
import {fetchCameraSettings} from "../../common/api.ts";
import {fNumberList, isoList, ssList} from "../../../../settings";

function Control({deviceId}) {
    const [loaded, setLoaded] = useState(false)
    const [cameraSettings, setCameraSettings] = useState({
        'ss': 0,
        'iso': 0,
        'f_number': 0
    })

    useEffect(
        () => {
            const retrieve = async () => {
                const settings = await fetchCameraSettings(deviceId)
                setCameraSettings(
                    {
                        'ss': settings['ss'],
                        'iso': settings['iso'],
                        'f_number': settings['f']
                    })
            }
            retrieve().then(() => setLoaded(true))
        }, []
    )

    const onFinish = (key, val) => {
        if (!val) {
            setCameraSettings({...cameraSettings, [key]: ''})
            return
        }

        let ret = -1
        const pickNearest = (target, list) => {
            const diff = list.map(e => Math.abs(e - target))
            const smallestIndex = diff.indexOf(Math.min(...diff))
            return list[smallestIndex]
        }
        if (key === 'iso') ret = pickNearest(val, isoList)
        else if (key === 'f_number') ret = pickNearest(val, fNumberList)
        else if (key === 'ss') ret = pickNearest(val, ssList)
        setCameraSettings({...cameraSettings, [key]: ret})
    }
    const handler = (key, val) => {
        setCameraSettings({...cameraSettings, [key]: val})
    }

    const capture = () => {

    }

    return loaded ? (
        <div className="control">
            <img src="/image.jpg" alt=""/>
            <div className="config">
                <div className="forms">
                    <Form labelName="SS(ms)" id="ss" val={cameraSettings['ss']} inputHandler={handler}
                          onFinish={onFinish}/>
                    <Form labelName="ISO" id="iso" val={cameraSettings['iso']} inputHandler={handler}
                          onFinish={onFinish}/>
                    <Form labelName="F Number" id="f_number" val={cameraSettings['f_number']} inputHandler={handler}
                          onFinish={onFinish}/>
                </div>
                <Button handler={capture}/>
            </div>
        </div>
    ) : undefined
}

export default Control;