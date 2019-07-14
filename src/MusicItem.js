import React from 'react';
import './css/MusicItem.css';

const MusicItem = (props) => (
    <div key={props.item.id}>
        {props.item.uri}
    </div>

);

export default MusicItem;
