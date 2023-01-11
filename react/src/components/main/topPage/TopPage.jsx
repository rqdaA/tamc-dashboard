import React from 'react';
import Card from "./Card";
import './topPage.scss'

//TODO Retrieve Values from API or Config File
const TopPage = ({confFile}) => (
    <div className="cards" data-aos="fade-down">
        <Card deviceId="201" isOnline={true} moisture={'30%'} cpuTemp={'50℃'} lastRecvTime={'2022 10/23'}
              overAllUsage={'80%'} usbUsage={'20%'} detailURL="/201/info"/>
        <Card deviceId="202" isOnline={false} moisture={'10%'} cpuTemp={'30℃'} lastRecvTime={'2022 10/23'}
              overAllUsage={'30%'} usbUsage={'90%'} detailURL="/202/info"/>
        <Card deviceId="203" isOnline={true} moisture={'30%'} cpuTemp={'50℃'} lastRecvTime={'2022 10/23'}
              overAllUsage={'60%'} usbUsage={'20%'} detailURL="/203/info"/>
        <Card deviceId="204" isOnline={true} moisture={'30%'} cpuTemp={'50℃'} lastRecvTime={'2022 10/23'}
              overAllUsage={'60%'} usbUsage={'20%'} detailURL="/204/info"/>
    </div>
)

export default TopPage;