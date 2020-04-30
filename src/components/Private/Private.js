import React from 'react';
import './Private.scss';

const MusicItem = (props) => (
    <div className='private-mode'>
        <span>private</span>
        <input type='checkbox' className={`radio ${props.private}`} />
    </div>
);

export default MusicItem;
