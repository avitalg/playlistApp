import React from 'react';
import './Home.scss';
// this component will be rendered by our <___Router>
const Home = () => (
    <div className='homepage'>
        <section id='start'>
            <div className='start-content'>
                <h1>Rhythmes</h1>
                <p>changes the way you share music</p>
            </div>
            <div className='start-btn'>
                Start Now
            </div>
        </section>
        <section className='explain'>
            <div>
                <p>Share your video list to everyone</p>
            </div>
            <div>
                <img alt='woman listening' className='explained-pic' src='imgs/bgr/woman-listening.jpg' />
            </div>
        </section>
        <section className='explain'>
            <div>
                <img alt='happy couple' className='explained-pic' src='imgs/bgr/happy-couple.jpg' />
            </div>
            <div>
                <p>Keep share your best songs with your friends and create community around it</p>
            </div>
        </section>
        <section className='abilities'>
            <h2>Abilities</h2>
            <ul className='a-list'>
                <li>
                    <p>Create a playlist</p>
                    <img className="icon" alt='playlist icon' src='/imgs/icons/playlist.png' />
                </li>
                <li>
                    <p>Share between friends</p>
                    <img className='icon' alt='share icon' src='/imgs/icons/share.png' />
                </li>
                <li>
                    <p>Updated in real time</p>
                    <img className='icon' alt='update icon' src='/imgs/icons/update.png' />
                </li>
                <li>
                    <p>Get a unique URL</p>
                    <img className='icon' alt='domain icon' src='/imgs/icons/domain.png' />
                </li>
                <li>
                    <p>Search for songs easily</p>
                    <img className='icon' alt='youtube' src='/imgs/icons/youtube.png' />
                </li>
            </ul>
        </section>
        <section id='start-now'>
            <h2><a href='/start'>Start Now</a></h2>
        </section>
    </div>
)

export default Home;
