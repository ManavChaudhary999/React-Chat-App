import React from "react";

import {closeIcon} from "../../Icons/closeIcon.png";
import {onlineIcon} from "../../Icons/onlineIcon.png";
import "./infoBar.css";

const InfoBar = ({room}) => {
    return(
    <div className="infoBar">
        <div className="leftInnerConatiner">
            <img src={onlineIcon} alt="online" className="onlineIcon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close" /></a>
        </div>
    </div>
    );
};

export default InfoBar;