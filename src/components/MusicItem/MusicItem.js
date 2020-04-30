import React from 'react';
import './MusicItem.scss';

const MusicItem = (props) => (
    <div className='MusicItem' data-id={props.id} data-curr={props.curr} onClick={(e) => props.click && props.click(props.id, e)} key={props.id}>
        <span>
            {props.title}
        </span>
    </div>
);

export default MusicItem;
