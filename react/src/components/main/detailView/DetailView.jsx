import React from 'react';
import Menu from "./Menu";
import DetailRouter from "./DetailRouter";
import './detailView.scss'

const DetailView = ({deviceIdentifier}) => (
    <div className="detailView">
        <Menu/>
        <DetailRouter deviceId={deviceIdentifier}/>
    </div>
)

export default DetailView;