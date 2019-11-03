import React from 'react';
import './css/Private.css';

const MusicItem = (props) => (
    <div className="private-mode">
        <span>private</span>
        <div className={"radio " + props.private}><div className="circle"></div></div>
    </div>
);

export default MusicItem;
