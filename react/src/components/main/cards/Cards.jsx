import React from 'react';
import Card from "./Card";
import './cards.scss'

//TODO Retrieve Values from API or Config File
const Cards = ({confFile}) => (
    <div className="cards" data-aos="fade-down">
        <Card isOnline={true} moisture={'30%'} cpuTemp={'50C'} lastRecvTime={'2022 10/23'}
              overAllUsage={'80%'} usbUsage={'20%'} detailURL="/201/info"/>
        <Card isOnline={false} moisture={'10%'} cpuTemp={'30C'} lastRecvTime={'2022 10/23'}
              overAllUsage={'30%'} usbUsage={'90%'} detailURL="/202/info"/>
        <Card isOnline={true} moisture={'30%'} cpuTemp={'50C'} lastRecvTime={'2022 10/23'}
              overAllUsage={'60%'} usbUsage={'20%'} detailURL="/203/info"/>
        <Card isOnline={true} moisture={'30%'} cpuTemp={'50C'} lastRecvTime={'2022 10/23'}
              overAllUsage={'60%'} usbUsage={'20%'} detailURL="/204/info"/>
    </div>
)

export default Cards;