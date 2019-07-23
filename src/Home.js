import React from 'react';
import './css/Home.css';
// this component will be rendered by our <___Router>
const Home = () => (
    <div className="homepage">
        <section id="start">
            <div>
                <h1>Rhythmes</h1>
                <p>changes the way you share<br /> music</p>
            </div>
        </section>
        <section className="abilities">
            <h2>Abilities</h2>
            <ul className="a-list">
                <li>
                    <p>Create a playlist</p>
                    <figure>
                        <img className="icon" src={require('./imgs/icons/playlist.png')} />
                    </figure>

                </li>
                <li>
                    <p>Share between friends</p>
                    <figure>
                        <img className="icon" src={require('./imgs/icons/share.png')} />
                    </figure>
                </li>
                <li>
                    <p>Updated in real time</p>
                    <figure>
                        <img className="icon" src={require('./imgs/icons/update.png')} />
                    </figure>
                </li>
                <li>
                    <p>Get a unique URL</p>
                    <figure>
                        <img className="icon" src={require('./imgs/icons/domain.png')} />
                    </figure>
                </li>
                <li>
                    <p>Search for songs easily</p>
                    <figure>
                        <img className="icon" src={require('./imgs/icons/youtube.png')} />
                    </figure>
                </li>
            </ul>
        </section>
        <section id="start-now">
            <h2><a href="/start">Start Now</a></h2>
        </section>
    </div>
)

export default Home;
