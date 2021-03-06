import React from 'react';
import './Loader.scss';

const Loader = () => (
    <div className='loading-bar'>
        <div className='lds-facebook'>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)

export default Loader;