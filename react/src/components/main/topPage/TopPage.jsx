import React, {useEffect, useState} from 'react';
import Card from "./Card";
import './topPage.scss'
import {fetchData, getElement} from "../common/api.ts";
import {deviceIds} from "../../../settings";

const TopPage = () => {
    // TODO Display Rest when some of Endpoints errored
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            for (let id of deviceIds) {
                const d =  fetchData(id)
                await d
            }
            setLoaded(true)
        }
        fetch()
    }, [])

    return loaded ? (
        <div className="cards" data-aos="fade-down">
            {deviceIds.map((id,i) => (
                <Card deviceId={id}
                      isOnline={getElement(id, "isOnline")}
                      cpuTemp={getElement(id, "cpuTemp")}
                      lastRecvTime={getElement(id, 'lastUpdate')}
                      overAllUsage={getElement(id, 'sdCardUsage')}
                      usbUsage={getElement(id, 'usbUsage')}
                      detailURL={`/${id}/info`}
                      key={i}
                />
            ))}
        </div>
    ) : 0
}

export default TopPage;