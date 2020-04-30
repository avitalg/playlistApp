import React from 'react';
import './Share.scss';

const Share = () => (
    <div className='sharing'>
        <ul>
            <li><a href={`whatsapp://send?text=Check out that playlist! ${window.location.href}`} data-action='share/whatsapp/share' title='Share with whatsapp'><img alt='whatsup icon' src='/imgs/social_media/whatsapp.png' /></a></li>
            <li><a href={`https://www.facebook.com/sharer.php?u=${window.location.href}`} target='_blank' title='Share with facebook'><img alt='facebook icon' src='/imgs/social_media/facebook.png' /></a></li>
            <li><a href={`mailto:?subject=My Rhythmes Playlist&amp;body=Check out that playlist! ${window.location.href}`} title='Share with email'><img alt='email icon' src='/imgs/social_media/email.png' /></a></li>
        </ul>
    </div>
);

export default Share;



