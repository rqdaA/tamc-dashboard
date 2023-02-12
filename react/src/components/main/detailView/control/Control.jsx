import React, {useEffect, useState} from 'react';
import './control.scss'
import Form from './Form'
import Button from "./Button";
import {captureImage, fetchCameraSettings, fetchLatestImage} from "../../common/api.ts";
import {fNumberList, isoList, ssList} from "../../../../settings";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"

function Control({deviceId}) {
    const [loaded, setLoaded] = useState(false)
    const [cameraSettings, setCameraSettings] = useState({
        'ss': 0,
        'iso': 0,
        'f_number': 0
    })
    const [imageURL, setImageURL] = useState('')
    const [errorText, setErrorText] = useState('')

    useEffect(
        () => {
            const retrieve = async () => {
                const settings = await fetchCameraSettings(deviceId)
                setImageURL(await fetchLatestImage(deviceId))
                setCameraSettings(
                    {
                        'ss': settings['ss'],
                        'iso': settings['iso'],
                        'f_number': settings['f_number']
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

    const capture = async () => {
        try {
            const url = await captureImage(deviceId, cameraSettings)
            setImageURL(url)
        } catch (e) {
            console.log(e)
            setErrorText('Error!!!') // TODO Error Handling
            setTimeout(() => setErrorText(''), 3000)
        }
    }

    // TODO Input in ms -> x/y (s)
    return loaded ? (
        <div className="control">
            <img src={imageURL} alt=""/>
            <div className="config">
                <div className="forms">
                    <Form labelName="SS(ms)" id="ss" val={cameraSettings['ss']} inputHandler={handler}
                          onFinish={onFinish} autofocus/>
                    <Form labelName="ISO" id="iso" val={cameraSettings['iso']} inputHandler={handler}
                          onFinish={onFinish}/>
                    <Form labelName="F Number" id="f_number" val={cameraSettings['f_number']} inputHandler={handler}
                          onFinish={onFinish}/>
                </div>
                <Button handler={capture}/>
                <Snackbar open={!!errorText} autoHideDuration={2000}>
                    <Alert severity="error" sx={{width: '100%'}}>{errorText}</Alert>
                </Snackbar>
            </div>
        </div>
    ) : <div className="control">
        <h1 style={{color: 'white'}}>
            LOADING...
        </h1>
    </div>
}

export default Control;